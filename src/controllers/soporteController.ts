import { Request, Response } from "express";
import soporteService from "../services/soporteService.js";
import { CategoriaSoporte, PrioridadSoporte } from "../models/soporteModel.js";

class SoporteController {

    async enviarMensaje(req: Request, res: Response) {
        try {
            const idUsuario = (req as any).user.id;
            const { categoria, prioridad, asunto, descripcion } = req.body;

            // Validaciones
            if (!categoria || !prioridad || !asunto || !descripcion) {
                return res.status(400).json({
                    message: "Todos los campos son requeridos"
                });
            }

            // Validar categoría
            if (!Object.values(CategoriaSoporte).includes(categoria)) {
                return res.status(400).json({
                    message: "Categoría inválida"
                });
            }

            // Validar prioridad
            if (!Object.values(PrioridadSoporte).includes(prioridad)) {
                return res.status(400).json({
                    message: "Prioridad inválida"
                });
            }

            // Validar longitud del asunto
            if (asunto.length < 5 || asunto.length > 200) {
                return res.status(400).json({
                    message: "El asunto debe tener entre 5 y 200 caracteres"
                });
            }

            // Validar longitud de la descripción
            if (descripcion.length < 20 || descripcion.length > 2000) {
                return res.status(400).json({
                    message: "La descripción debe tener entre 20 y 2000 caracteres"
                });
            }

            // Validar rate limit (5 mensajes por día)
            const puedeEnviar = await soporteService.validarRateLimit(idUsuario);

            if (!puedeEnviar) {
                return res.status(429).json({
                    message: "Has alcanzado el límite de 5 mensajes por día. Intenta mañana."
                });
            }

            // Obtener datos del usuario
            const usuario = await soporteService.obtenerDatosUsuario(idUsuario);

            if (!usuario) {
                return res.status(404).json({
                    message: "Usuario no encontrado"
                });
            }

            // Enviar emails
            await soporteService.enviarEmailsDesoporte(usuario, {
                categoria,
                prioridad,
                asunto,
                descripcion
            });

            // Registrar mensaje (para stats)
            await soporteService.registrarMensaje(idUsuario, categoria, prioridad);

            res.json({
                message: "Tu mensaje fue enviado correctamente. Te responderemos pronto."
            });

        } catch (error) {
            console.error("Error enviando mensaje de soporte:", error);
            res.status(500).json({
                message: "Error al enviar el mensaje de soporte"
            });
        }
    }
}

export default new SoporteController();