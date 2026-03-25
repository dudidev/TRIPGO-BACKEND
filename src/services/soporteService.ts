import pool from "../config/db.js";
import { EnviarMensajeSoporteDTO, DatosUsuarioSoporte } from "../models/soporteModel.js";
import soporteEmailToTeamTemplate from "../templates/soporteEmailToTeam.template.js";
import soporteEmailToUserTemplate from "../templates/soporteEmailToUser.template.js";
import { transporter } from "./emailService.js";

class SoporteService {

    // ========== OBTENER DATOS DEL USUARIO ==========

    async obtenerDatosUsuario(idUsuario: number): Promise<DatosUsuarioSoporte | null> {
        const [rows]: any = await pool.query(
            "SELECT id, nombre_usuario, correo_usuario FROM usuarios WHERE id = ?",
            [idUsuario]
        );

        if (rows.length === 0) {
            return null;
        }

        return rows[0];
    }

    // ========== ENVIAR EMAILS DE SOPORTE ==========

    async enviarEmailsDesoporte(
        usuario: DatosUsuarioSoporte,
        datos: EnviarMensajeSoporteDTO
    ): Promise<void> {

        const fechaHora = new Date().toLocaleString('es-CO', {
            dateStyle: 'long',
            timeStyle: 'short',
            timeZone: 'America/Bogota'
        });

        // Email al equipo de soporte
        const emailToTeam = soporteEmailToTeamTemplate({
            nombreUsuario: usuario.nombre_usuario,
            emailUsuario: usuario.correo_usuario,
            idUsuario: usuario.id,
            categoria: datos.categoria,
            prioridad: datos.prioridad,
            asunto: datos.asunto,
            descripcion: datos.descripcion,
            fechaHora
        });

        await transporter.sendMail({
            from: `"TripGO Soporte" <${process.env.EMAIL_USER}>`,
            to: "tripgoservice@gmail.com",
            subject: `[SOPORTE] ${datos.categoria.toUpperCase()} - ${datos.asunto}`,
            html: emailToTeam
        });

        // Email de confirmación al usuario
        const emailToUser = soporteEmailToUserTemplate({
            nombreUsuario: usuario.nombre_usuario,
            asunto: datos.asunto,
            prioridad: datos.prioridad
        });

        await transporter.sendMail({
            from: `"TripGO Soporte" <${process.env.EMAIL_USER}>`,
            to: usuario.correo_usuario,
            subject: "Recibimos tu mensaje - TripGO Soporte",
            html: emailToUser
        });

        console.log(`✅ Emails de soporte enviados para usuario #${usuario.id}`);
    }

    // ========== VALIDAR RATE LIMIT ==========

    async validarRateLimit(idUsuario: number): Promise<boolean> {
        // Contar mensajes enviados hoy
        const [rows]: any = await pool.query(
            `SELECT COUNT(*) as total 
        FROM historial_busquedas 
        WHERE id_usuario = ? 
        AND resultado_tipo = 'soporte'
        AND DATE(fecha_busqueda) = CURDATE()`,
            [idUsuario]
        );

        const totalHoy = rows[0]?.total || 0;

        // Máximo 5 mensajes por día
        return totalHoy < 5;
    }

    // ========== REGISTRAR MENSAJE (OPCIONAL - PARA STATS) ==========

    async registrarMensaje(idUsuario: number, categoria: string, prioridad: string): Promise<void> {
        // Usar tabla existente historial_busquedas para trackear
        await pool.query(
            `INSERT INTO historial_busquedas (id_usuario, termino_busqueda, resultado_tipo, resultado_id) 
        VALUES (?, ?, 'soporte', ?)`,
            [idUsuario, `${categoria}:${prioridad}`, 0]
        );
    }
}

export default new SoporteService();