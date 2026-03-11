import Router from "express";
import ServicioEstablecimientoController from "../controllers/servicioEstablecimientoController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: ServiciosEstablecimientos
 *   description: Relación entre servicios y establecimientos
 */

/**
 * @swagger
 * /servicios-establecimientos:
 *   post:
 *     summary: Asignar servicio a un establecimiento
 *     tags: [ServiciosEstablecimientos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - servicio_id
 *               - establecimiento_id
 *             properties:
 *               servicio_id:
 *                 type: integer
 *                 example: 2
 *               establecimiento_id:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       201:
 *         description: Servicio asignado al establecimiento
 *       400:
 *         description: Error en los datos
 */
router.post("/", ServicioEstablecimientoController.crear);

export default router;
