import Router from "express";
import ServicioController from "../controllers/servicioController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Servicios
 *   description: Gestión de servicios
 */

/**
 * @swagger
 * /servicios:
 *   get:
 *     summary: Listar servicios
 *     tags: [Servicios]
 *     responses:
 *       200:
 *         description: Lista de servicios
 */
router.get("/", ServicioController.listar);

/**
 * @swagger
 * /servicios:
 *   post:
 *     summary: Crear servicio
 *     tags: [Servicios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: WiFi
 *     responses:
 *       201:
 *         description: Servicio creado
 *       400:
 *         description: Error en los datos
 */
router.post("/", ServicioController.crear);

export default router;
