import pool from "../config/db.js";
import type { Resena, CrearResenaDTO, ActualizarResenaDTO, EstadisticasResenas } from "../models/resenaModel.js";

class ResenaRepository {
    async crear(idUsuario: number, data: CrearResenaDTO): Promise<number> {
        const [result]: any = await pool.query(
            `INSERT INTO resenas (id_usuario, id_establecimiento, calificacion, comentario) 
       VALUES (?, ?, ?, ?)`,
            [idUsuario, data.id_establecimiento, data.calificacion, data.comentario]
        );

        return result.insertId;
    }

    async obtenerPorId(idResena: number): Promise<Resena | null> {
        const [rows]: any = await pool.query(
            `SELECT * FROM resenas WHERE id_resena = ?`,
            [idResena]
        );

        return rows.length > 0 ? rows[0] : null;
    }

    async listarPorEstablecimiento(idEstablecimiento: number): Promise<any[]> {
        const [rows]: any = await pool.query(
            `SELECT 
        r.*,
        u.id,
        u.nombre_usuario,
        u.foto_perfil
       FROM resenas r
       INNER JOIN usuarios u ON r.id_usuario = u.id
       WHERE r.id_establecimiento = ?
       ORDER BY r.fecha_creacion DESC`,
            [idEstablecimiento]
        );

        return rows;
    }

    async obtenerEstadisticas(idEstablecimiento: number): Promise<EstadisticasResenas> {
        const [stats]: any = await pool.query(
            `SELECT calificacion_promedio, total_resenas 
       FROM establecimiento 
       WHERE id_establecimiento = ?`,
            [idEstablecimiento]
        );

        const [distribucion]: any = await pool.query(
            `SELECT calificacion, COUNT(*) as cantidad
       FROM resenas
       WHERE id_establecimiento = ?
       GROUP BY calificacion`,
            [idEstablecimiento]
        );

        const dist: { [key: number]: number } = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        distribucion.forEach((row: any) => {
            dist[row.calificacion] = row.cantidad;
        });

        return {
            promedio: stats[0]?.calificacion_promedio || 0,
            total: stats[0]?.total_resenas || 0,
            distribucion: dist
        };
    }

    async usuarioTieneResena(idUsuario: number, idEstablecimiento: number): Promise<boolean> {
        const [rows]: any = await pool.query(
            `SELECT id_resena FROM resenas 
       WHERE id_usuario = ? AND id_establecimiento = ?`,
            [idUsuario, idEstablecimiento]
        );

        return rows.length > 0;
    }

    async listarPorUsuario(idUsuario: number): Promise<any[]> {
        const [rows]: any = await pool.query(
            `SELECT 
        r.*,
        e.nombre_establecimiento,
        e.calificacion_promedio as promedio_establecimiento
       FROM resenas r
       INNER JOIN establecimiento e ON r.id_establecimiento = e.id_establecimiento
       WHERE r.id_usuario = ?
       ORDER BY r.fecha_creacion DESC`,
            [idUsuario]
        );

        return rows;
    }

    async actualizar(idResena: number, data: ActualizarResenaDTO): Promise<void> {
        const campos: string[] = [];
        const valores: any[] = [];

        if (data.calificacion !== undefined) {
            campos.push('calificacion = ?');
            valores.push(data.calificacion);
        }

        if (data.comentario !== undefined) {
            campos.push('comentario = ?');
            valores.push(data.comentario);
        }

        if (campos.length === 0) return;

        campos.push('fecha_edicion = NOW()');
        valores.push(idResena);

        await pool.query(
            `UPDATE resenas SET ${campos.join(', ')} WHERE id_resena = ?`,
            valores
        );
    }

    async eliminar(idResena: number): Promise<void> {
        await pool.query(
            `DELETE FROM resenas WHERE id_resena = ?`,
            [idResena]
        );
    }

    async establecimientoExiste(idEstablecimiento: number): Promise<boolean> {
        const [rows]: any = await pool.query(
            `SELECT id_establecimiento FROM establecimiento WHERE id_establecimiento = ?`,
            [idEstablecimiento]
        );

        return rows.length > 0;
    }
}

export default new ResenaRepository();