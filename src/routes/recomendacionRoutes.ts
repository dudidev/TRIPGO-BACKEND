import { Router } from "express";
import RecomendacionController from "../controllers/recomendacionController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Recomendaciones
 *   description: Sistema de recomendaciones personalizadas basado en IA
 */

/**
 * @swagger
 * /recomendaciones/personalizadas:
 *   get:
 *     summary: Obtener recomendaciones personalizadas
 *     description: Genera recomendaciones basadas en el historial, preferencias y comportamiento del usuario
 *     tags: [Recomendaciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Número máximo de recomendaciones a retornar
 *     responses:
 *       200:
 *         description: Recomendaciones generadas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 10
 *                 recomendaciones:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_establecimiento:
 *                         type: integer
 *                         example: 15
 *                       nombre_establecimiento:
 *                         type: string
 *                         example: "Hotel Vista Hermosa"
 *                       tipo:
 *                         type: integer
 *                         example: 1
 *                       nombre_tipo:
 *                         type: string
 *                         example: "Hotel"
 *                       ubicacion:
 *                         type: string
 *                         example: "Salento"
 *                       calificacion_promedio:
 *                         type: number
 *                         example: 4.7
 *                       total_resenas:
 *                         type: integer
 *                         example: 32
 *                       score_relevancia:
 *                         type: number
 *                         example: 87
 *                       razon:
 *                         type: string
 *                         example: "Te gustan los hoteles • Has visitado Salento • Muy bien calificado"
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/personalizadas", verifyToken, RecomendacionController.obtenerRecomendaciones);

/**
 * @swagger
 * /recomendaciones/mi-perfil:
 *   get:
 *     summary: Obtener perfil de preferencias del usuario
 *     description: Retorna el perfil calculado con tipos y ubicaciones favoritas
 *     tags: [Recomendaciones]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tipos_favoritos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_tipo:
 *                         type: integer
 *                         example: 1
 *                       nombre_tipo:
 *                         type: string
 *                         example: "Hotel"
 *                       score:
 *                         type: number
 *                         example: 85
 *                 ubicaciones_favoritas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ubicacion:
 *                         type: string
 *                         example: "Salento"
 *                       visitas:
 *                         type: integer
 *                         example: 12
 *                 promedio_calificaciones_dadas:
 *                   type: number
 *                   example: 4.2
 *                 total_interacciones:
 *                   type: integer
 *                   example: 47
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get(
    "/mi-perfil",
    verifyToken,
    RecomendacionController.obtenerPerfil
);

/**
 * @swagger
 * /recomendaciones/refrescar-perfil:
 *   post:
 *     summary: Recalcular perfil del usuario
 *     description: Fuerza el recálculo del perfil de preferencias basado en las últimas interacciones
 *     tags: [Recomendaciones]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Perfil actualizado exitosamente"
 *                 perfil:
 *                   type: object
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post("/refrescar-perfil", verifyToken, RecomendacionController.refrescarPerfil);

/**
 * @swagger
 * /recomendaciones/registrar-visualizacion:
 *   post:
 *     summary: Registrar visualización de establecimiento
 *     description: Registra cuando un usuario visualiza el detalle de un establecimiento para alimentar el sistema de recomendaciones
 *     tags: [Recomendaciones]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_establecimiento
 *             properties:
 *               id_establecimiento:
 *                 type: integer
 *                 example: 5
 *               tiempo_visualizacion:
 *                 type: integer
 *                 description: Tiempo en segundos que el usuario estuvo viendo (opcional)
 *                 example: 45
 *     responses:
 *       201:
 *         description: Visualización registrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Visualización registrada"
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post("/registrar-visualizacion", verifyToken, RecomendacionController.registrarVisualizacion);

export default router;