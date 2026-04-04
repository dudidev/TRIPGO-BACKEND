import pool from "../config/db.js";
import type { HistorialVisualizacion, PerfilUsuario } from "../models/recomendacionModel.js";

class RecomendacionRepository {

    // ========== HISTORIAL DE VISUALIZACIONES ==========

    async registrarVisualizacion(data: HistorialVisualizacion): Promise<void> {
        await pool.query(
            `INSERT INTO historial_visualizaciones (id_usuario, id_establecimiento, tiempo_visualizacion)
        VALUES (?, ?, ?)`,
            [data.id_usuario, data.id_establecimiento, data.tiempo_visualizacion || 0]
        );
    }

    async obtenerHistorialUsuario(idUsuario: number, dias: number = 90): Promise<any[]> {
        const [rows]: any = await pool.query(
            `SELECT 
        h.id_establecimiento,
        e.tipo,
        t.nombre_tipo,
        e.ubicacion,
        COUNT(*) as veces_visto,
        SUM(h.tiempo_visualizacion) as tiempo_total
        FROM historial_visualizaciones h
        INNER JOIN establecimiento e ON h.id_establecimiento = e.id_establecimiento
        INNER JOIN tipos t ON e.tipo = t.id_tipo
        WHERE h.id_usuario = ?
        AND h.fecha_visita >= DATE_SUB(NOW(), INTERVAL ? DAY)
        GROUP BY h.id_establecimiento, e.tipo, t.nombre_tipo, e.ubicacion`,
            [idUsuario, dias]
        );
        return rows;
    }

    // ========== ANÁLISIS DE PREFERENCIAS ==========

    async obtenerResenasUsuario(idUsuario: number): Promise<any[]> {
        const [rows]: any = await pool.query(
            `SELECT 
        r.calificacion,
        e.tipo,
        t.nombre_tipo,
        e.ubicacion
        FROM resenas r
        INNER JOIN establecimiento e ON r.id_establecimiento = e.id_establecimiento
       INNER JOIN tipos t ON e.tipo = t.id_tipo
       WHERE r.id_usuario = ?`,
            [idUsuario]
        );
        return rows;
    }

    async obtenerFavoritosUsuario(idUsuario: number): Promise<any[]> {
        const [rows]: any = await pool.query(
            `SELECT 
        e.tipo,
        t.nombre_tipo,
        e.ubicacion
        FROM favoritos f
        INNER JOIN establecimiento e ON f.id_establecimiento = e.id_establecimiento
        INNER JOIN tipos t ON e.tipo = t.id_tipo
        WHERE f.id_usuario = ?`,
            [idUsuario]
        );
        return rows;
    }

    async obtenerItinerariosUsuario(idUsuario: number): Promise<any[]> {
        const [rows]: any = await pool.query(
            `SELECT DISTINCT
        e.tipo,
        t.nombre_tipo,
        e.ubicacion
       FROM detalles_planeador dp
       INNER JOIN planeador p ON dp.id_planeador = p.id_planeador
       INNER JOIN servicios s ON dp.id_servicio = s.id
       INNER JOIN servicios_establecimiento se ON s.id = se.id_servicios
       INNER JOIN establecimiento e ON se.id_establecimiento = e.id_establecimiento
       INNER JOIN tipos t ON e.tipo = t.id_tipo
       WHERE p.id_usuario = ?`,
            [idUsuario]
        );
        return rows;
    }

    async obtenerBusquedasUsuario(idUsuario: number, dias: number = 90): Promise<any[]> {
        const [rows]: any = await pool.query(
            `SELECT 
        termino_busqueda,
        resultado_tipo,
        resultado_id,
        COUNT(*) as veces_buscado
       FROM historial_busquedas
       WHERE id_usuario = ?
       AND fecha_busqueda >= DATE_SUB(NOW(), INTERVAL ? DAY)
       GROUP BY termino_busqueda, resultado_tipo, resultado_id`,
            [idUsuario, dias]
        );
        return rows;
    }

    // ========== GUARDAR/OBTENER PERFIL ==========

    async guardarPreferencias(idUsuario: number, preferencias: any): Promise<void> {
        try {
            await pool.query(
                `INSERT INTO preferencias_usuario 
       (id_usuario, tipos_favoritos, ubicaciones_favoritas, promedio_calificaciones, total_interacciones)
       VALUES (?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
       tipos_favoritos = VALUES(tipos_favoritos),
       ubicaciones_favoritas = VALUES(ubicaciones_favoritas),
       promedio_calificaciones = VALUES(promedio_calificaciones),
       total_interacciones = VALUES(total_interacciones)`,
                [
                    idUsuario,
                    JSON.stringify(preferencias.tipos_favoritos ?? []),
                    JSON.stringify(preferencias.ubicaciones_favoritas ?? []),
                    preferencias.promedio_calificaciones ?? 0,
                    preferencias.total_interacciones ?? 0
                ]
            );
        } catch (e) {
            console.warn('guardarPreferencias falló silenciosamente:', e);
        }
    }

    async obtenerPreferencias(idUsuario: number): Promise<any | null> {
        const [rows]: any = await pool.query(
            `SELECT * FROM preferencias_usuario WHERE id_usuario = ?`,
            [idUsuario]
        );

        if (rows.length === 0) return null;

        const preferencia = rows[0];

        // Helper para parsear JSON de forma segura
        const parseJSON = (value: any, defaultValue: any = []) => {
            if (typeof value === 'string') {
                try {
                    return JSON.parse(value);
                } catch {
                    return defaultValue;
                }
            }
            return value || defaultValue;
        };

        return {
            ...preferencia,
            tipos_favoritos: parseJSON(preferencia.tipos_favoritos, []),
            ubicaciones_favoritas: parseJSON(preferencia.ubicaciones_favoritas, [])
        };
    }

    // ========== OBTENER ESTABLECIMIENTOS ==========

    async obtenerEstablecimientosNoVistos(idUsuario: number, limite: number = 100): Promise<any[]> {
        const [rows]: any = await pool.query(
            `SELECT 
        e.*,
        t.nombre_tipo,
        COALESCE(e.calificacion_promedio, 0) as calificacion_promedio,
        COALESCE(e.total_resenas, 0) as total_resenas
       FROM establecimiento e
       INNER JOIN tipos t ON e.tipo = t.id_tipo
       WHERE e.estado = 'activo'
       AND e.id_establecimiento NOT EXISTS(
         SELECT id_establecimiento FROM historial_visualizaciones WHERE id_usuario = ?
         UNION
         SELECT id_establecimiento FROM favoritos WHERE id_usuario = ?
         UNION
         SELECT r.id_establecimiento FROM resenas r WHERE r.id_usuario = ?
       )
       LIMIT ?`,
            [idUsuario, idUsuario, idUsuario, limite]
        );
        return rows;
    }

    async obtenerTopGeneral(limite: number = 10): Promise<any[]> {
        const [rows]: any = await pool.query(
            `SELECT 
        e.*,
        t.nombre_tipo,
        COALESCE(e.calificacion_promedio, 0) as calificacion_promedio,
        COALESCE(e.total_resenas, 0) as total_resenas
       FROM establecimiento e
       INNER JOIN tipos t ON e.tipo = t.id_tipo
       WHERE e.estado = 'activo'
       ORDER BY e.calificacion_promedio DESC, e.total_resenas DESC
       LIMIT ?`,
            [limite]
        );
        return rows;
    }

    // Verificar si establecimiento existe
    async establecimientoExiste(idEstablecimiento: number): Promise<boolean> {
        const [rows]: any = await pool.query(
            `SELECT id_establecimiento FROM establecimiento WHERE id_establecimiento = ?`,
            [idEstablecimiento]
        );
        return rows.length > 0;
    }
}

export default new RecomendacionRepository();