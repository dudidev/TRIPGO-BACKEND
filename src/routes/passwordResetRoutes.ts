import { Router } from "express";
import PasswordResetController from "../controllers/passwordResetController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Password Reset
 *   description: Recuperación de contraseña
 */

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Solicitar recuperación de contraseña
 *     description: Envía un email con link para restablecer la contraseña
 *     tags: [Password Reset]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - correo_usuario
 *             properties:
 *               correo_usuario:
 *                 type: string
 *                 format: email
 *                 example: "juan@example.com"
 *     responses:
 *       200:
 *         description: Solicitud procesada (siempre retorna 200 por seguridad)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Si el correo existe en nuestro sistema, recibirás un enlace de recuperación"
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post("/forgot-password", PasswordResetController.forgotPassword);

/**
 * @swagger
 * /auth/validate-reset-token:
 *   get:
 *     summary: Validar token de recuperación
 *     description: Verifica si un token de recuperación es válido y no ha expirado
 *     tags: [Password Reset]
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token JWT de recuperación
 *     responses:
 *       200:
 *         description: Token válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valid:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Token inválido o expirado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valid:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Token expirado"
 */
router.get("/validate-reset-token", PasswordResetController.validateResetToken);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Restablecer contraseña
 *     description: Actualiza la contraseña del usuario usando el token de recuperación
 *     tags: [Password Reset]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - nueva_password
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token JWT de recuperación
 *               nueva_password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 example: "nuevaPassword123"
 *     responses:
 *       200:
 *         description: Contraseña actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contraseña actualizada exitosamente"
 *       400:
 *         description: Token inválido o contraseña muy corta
 *       500:
 *         description: Error del servidor
 */
router.post("/reset-password", PasswordResetController.resetPassword);

export default router;