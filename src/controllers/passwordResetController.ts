import { Request, Response } from "express";
import passwordResetService from "../services/passwordResetService.js";
import { sendPasswordResetEmail } from "../services/emailService.js";

class PasswordResetController {

    // ========== SOLICITAR RESET DE CONTRASEÑA ==========

    async forgotPassword(req: Request, res: Response) {
        try {
            const { correo_usuario } = req.body;

            if (!correo_usuario) {
                return res.status(400).json({
                    message: "El correo electrónico es requerido"
                });
            }

            // Validar formato de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(correo_usuario)) {
                return res.status(400).json({
                    message: "El formato del correo electrónico es inválido"
                });
            }

            const resultado = await passwordResetService.solicitarReset(correo_usuario);

            // Si encontró usuario, enviar email
            if (resultado.token && resultado.usuario) {
                try {
                    await sendPasswordResetEmail(
                        resultado.usuario.correo_usuario,
                        resultado.usuario.nombre_usuario,
                        resultado.token
                    );
                } catch (emailError) {
                    console.error("Error enviando email de recuperación:", emailError);
                    return res.status(500).json({
                        message: "Error al enviar el correo de recuperación"
                    });
                }
            }

            // SIEMPRE responder lo mismo (no revelar si el email existe o no)
            res.json({
                message: "Si el correo existe en nuestro sistema, recibirás un enlace de recuperación"
            });

        } catch (error) {
            console.error("Error en forgot password:", error);
            res.status(500).json({
                message: "Error al procesar la solicitud"
            });
        }
    }

    // ========== VALIDAR TOKEN DE RESET ==========

    async validateResetToken(req: Request, res: Response) {
        try {
            const { token } = req.query;

            if (!token || typeof token !== 'string') {
                return res.status(400).json({
                    valid: false,
                    message: "Token no proporcionado"
                });
            }

            const resultado = await passwordResetService.validarToken(token);

            if (!resultado.valid) {
                return res.status(400).json(resultado);
            }

            res.json({ valid: true });

        } catch (error) {
            console.error("Error validando token:", error);
            res.status(500).json({
                valid: false,
                message: "Error al validar el token"
            });
        }
    }

    // ========== RESTABLECER CONTRASEÑA ==========

    async resetPassword(req: Request, res: Response) {
        try {
            const { token, nueva_password } = req.body;

            if (!token || !nueva_password) {
                return res.status(400).json({
                    message: "Token y nueva contraseña son requeridos"
                });
            }

            if (nueva_password.length < 6) {
                return res.status(400).json({
                    message: "La contraseña debe tener al menos 6 caracteres"
                });
            }

            await passwordResetService.restablecerPassword(token, nueva_password);

            res.json({
                message: "Contraseña actualizada exitosamente"
            });

        } catch (error) {
            console.error("Error restableciendo contraseña:", error);
            const errorMessage = error instanceof Error ? error.message : "Error al restablecer contraseña";
            res.status(400).json({ message: errorMessage });
        }
    }
}

export default new PasswordResetController();