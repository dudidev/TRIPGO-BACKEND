import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET no está definido en las variables de entorno");
}

class PasswordResetService {

    // ========== SOLICITAR RESET DE CONTRASEÑA ==========

    async solicitarReset(correo_usuario: string): Promise<{ token?: string; usuario?: any }> {

        // Buscar usuario por email
        const [rows]: any = await pool.query(
            "SELECT id, nombre_usuario, correo_usuario FROM usuarios WHERE correo_usuario = ?",
            [correo_usuario]
        );

        // Si no existe, retornar sin revelar
        if (rows.length === 0) {
            return {}; // No revelar que el email no existe
        }

        const usuario = rows[0];

        // Generar token JWT con expiración de 1 hora
        const resetToken = jwt.sign(
            {
                id: usuario.id,
                email: usuario.correo_usuario,
                purpose: "password-reset"
            },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        return { token: resetToken, usuario };
    }

    // ========== VALIDAR TOKEN DE RESET ==========

    async validarToken(token: string): Promise<{ valid: boolean; message?: string }> {
        try {
            const decoded: any = jwt.verify(token, JWT_SECRET);

            // Verificar que el token sea específicamente para reset de password
            if (decoded.purpose !== "password-reset") {
                return { valid: false, message: "Token inválido" };
            }

            // Verificar que el usuario aún existe
            const [rows]: any = await pool.query(
                "SELECT id FROM usuarios WHERE id = ?",
                [decoded.id]
            );

            if (rows.length === 0) {
                return { valid: false, message: "Usuario no encontrado" };
            }

            return { valid: true };

        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                return { valid: false, message: "Token expirado" };
            }
            return { valid: false, message: "Token inválido" };
        }
    }

    // ========== RESTABLECER CONTRASEÑA ==========

    async restablecerPassword(token: string, nuevaPassword: string): Promise<void> {

        // Validar token
        const validacion = await this.validarToken(token);

        if (!validacion.valid) {
            throw new Error(validacion.message || "Token inválido");
        }

        // Decodificar token para obtener el ID del usuario
        const decoded: any = jwt.verify(token, JWT_SECRET);

        // Validar longitud de contraseña
        if (nuevaPassword.length < 6) {
            throw new Error("La contraseña debe tener al menos 6 caracteres");
        }

        // Hashear nueva contraseña
        const hashedPassword = await bcrypt.hash(nuevaPassword, 10);

        // Actualizar contraseña en la base de datos
        await pool.query(
            "UPDATE usuarios SET password_u = ? WHERE id = ?",
            [hashedPassword, decoded.id]
        );
    }
}

export default new PasswordResetService();