const { Router } = require("express");
const { ServicioController } = require("../controllers/servicioController");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Servicios
 *   description: Gestión de servicios
 */

/**
 * @swagger
 * /api/servicios:
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
 * /api/servicios:
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

module.exports = router;
