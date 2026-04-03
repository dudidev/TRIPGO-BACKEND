import Router from "express";
import PlaneadorController from "../controllers/planeadorController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Planeador
 *   description: Gestión del planeador
 */

/**
 * @swagger
 * /planeador:
 *   post:
 *     summary: Crear planeador
 *     tags: [Planeador]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuario_id
 *               - fecha
 *             properties:
 *               usuario_id:
 *                 type: integer
 *                 example: 1
 *               fecha:
 *                 type: string
 *                 format: date
 *                 example: 2025-01-15
 *     responses:
 *       201:
 *         description: Planeador creado
 *       400:
 *         description: Error en los datos
 */
router.post("/", PlaneadorController.crear);

/**
 * @swagger
 * /planeador/{id}:
 *   get:
 *     summary: Obtener detalle de un planeador
 *     tags: [Planeador]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del planeador
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Detalle del planeador
 *       404:
 *         description: Planeador no encontrado
 */
router.get("/:id", PlaneadorController.obtenerDetalle);

export default router;