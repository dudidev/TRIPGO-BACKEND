import Router from "express";
import DetallePlaneadorController from "../controllers/detallePlaneadorController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: DetallesPlaneador
 *   description: Gestión de detalles del planeador
 */

/**
 * @swagger
 * /detalles-planeador:
 *   post:
 *     summary: Crear detalle del planeador
 *     tags: [DetallesPlaneador]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_planeador
 *               - id_establecimiento
 *               - id_servicio
 *             properties:
 *               id_planeador:
 *                 type: integer
 *                 example: 1
 *               id_establecimiento:
 *                 type: integer
 *                 example: 5
 *               id_servicio:
 *                 type: integer
 *                 example: 2
 *               cantidad:
 *                 type: integer
 *                 example: 1
 */
router.post("/", DetallePlaneadorController.crear);

export default router;