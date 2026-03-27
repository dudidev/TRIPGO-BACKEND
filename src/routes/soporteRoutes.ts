import { Router } from "express";
import SoporteController from "../controllers/soporteController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Soporte
 *   description: Sistema de soporte al usuario
 */

/**
 * @swagger
 * /soporte/enviar:
 *   post:
 *     summary: Enviar mensaje de soporte
 *     description: Permite a un usuario autenticado enviar un mensaje al equipo de soporte
 *     tags: [Soporte]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categoria
 *               - prioridad
 *               - asunto
 *               - descripcion
 *             properties:
 *               categoria:
 *                 type: string
 *                 enum: [tecnico, cuenta, pagos, general, sugerencia]
 *                 example: "tecnico"
 *               prioridad:
 *                 type: string
 *                 enum: [baja, media, alta, urgente]
 *                 example: "alta"
 *               asunto:
 *                 type: string
 *                 minLength: 5
 *                 maxLength: 200
 *                 example: "No puedo completar el pago"
 *               descripcion:
 *                 type: string
 *                 minLength: 20
 *                 maxLength: 2000
 *                 example: "Al intentar pagar con tarjeta de crédito me sale error 500..."
 *     responses:
 *       200:
 *         description: Mensaje enviado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tu mensaje fue enviado correctamente. Te responderemos pronto."
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "El asunto debe tener entre 5 y 200 caracteres"
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       429:
 *         description: Límite de mensajes alcanzado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Has alcanzado el límite de 5 mensajes por día"
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post("/enviar", verifyToken, SoporteController.enviarMensaje);

export default router;