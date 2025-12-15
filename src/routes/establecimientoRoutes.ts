const { Router } = require("express");
const { EstablecimientoController } = require("../controllers/establecimientoController");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Establecimientos
 *   description: Gestión de establecimientos
 */

/**
 * @swagger
 * /api/establecimientos:
 *   get:
 *     summary: Listar establecimientos
 *     tags: [Establecimientos]
 *     responses:
 *       200:
 *         description: Lista de establecimientos
 */
router.get("/", EstablecimientoController.listar);

/**
 * @swagger
 * /api/establecimientos:
 *   post:
 *     summary: Crear establecimiento
 *     tags: [Establecimientos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - direccion
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Hotel TripGO
 *               direccion:
 *                 type: string
 *                 example: Calle 123 #45-67
 *     responses:
 *       201:
 *         description: Establecimiento creado
 *       400:
 *         description: Error en los datos
 */
router.post("/", EstablecimientoController.crear);

module.exports = router;
