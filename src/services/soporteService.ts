import pool from "../config/db.js";
import { EnviarMensajeSoporteDTO, DatosUsuarioSoporte } from "../models/soporteModel.js";
import { sendSoporteToTeam, sendSoporteToUser } from "./emailService.js";

class SoporteService {

    // ══ OBTENER DATOS DEL USUARIO ════════════════════════════════════════════

    async obtenerDatosUsuario(idUsuario: number): Promise<DatosUsuarioSoporte | null> {
        const [rows]: any = await pool.query(
            "SELECT id, nombre_usuario, correo_usuario FROM usuarios WHERE id = ?",
            [idUsuario]
        );
        return rows.length === 0 ? null : rows[0];
    }

    // ══ ENVIAR EMAILS DE SOPORTE ═════════════════════════════════════════════

    async enviarEmailsDesoporte(
        usuario: DatosUsuarioSoporte,
        datos: EnviarMensajeSoporteDTO
    ): Promise<void> {
        const fechaHora = new Intl.DateTimeFormat("es-CO", {
            dateStyle: "long",
            timeStyle: "short",
            timeZone: "America/Bogota",
        }).format(new Date());

        // Ambos emails en paralelo — si uno falla, el error sube al controller
        await Promise.all([
            sendSoporteToTeam({
                nombreUsuario: usuario.nombre_usuario,
                emailUsuario: usuario.correo_usuario,
                idUsuario: usuario.id,
                categoria: datos.categoria,
                prioridad: datos.prioridad,
                asunto: datos.asunto,
                descripcion: datos.descripcion,
                fechaHora,
            }),
            sendSoporteToUser({
                nombreUsuario: usuario.nombre_usuario,
                emailUsuario: usuario.correo_usuario,
                asunto: datos.asunto,
                prioridad: datos.prioridad,
            }),
        ]);
    }

    // ══ VALIDAR RATE LIMIT ═══════════════════════════════════════════════════

    async validarRateLimit(idUsuario: number): Promise<boolean> {
        const [rows]: any = await pool.query(
            `SELECT COUNT(*) as total
                FROM historial_busquedas
                WHERE id_usuario = ?
                AND resultado_tipo = 'soporte'
                AND DATE(fecha_busqueda) = CURDATE()`,
            [idUsuario]
        );
        return (rows[0]?.total ?? 0) < 5;
    }

    // ══ REGISTRAR MENSAJE ════════════════════════════════════════════════════

    async registrarMensaje(idUsuario: number, categoria: string, prioridad: string): Promise<void> {
        await pool.query(
            `INSERT INTO historial_busquedas (id_usuario, termino_busqueda, resultado_tipo, resultado_id)
            VALUES (?, ?, 'soporte', 0)`,
            [idUsuario, `${categoria}:${prioridad}`]
        );
    }
}

export default new SoporteService();