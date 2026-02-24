const { Router } = require("express");
const {DetallePlaneadorController} = require("../controllers/detallePlaneadorController");

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
 *               - planeador_id
 *               - establecimiento_id
 *             properties:
 *               planeador_id:
 *                 type: integer
 *                 example: 1
 *               establecimiento_id:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       201:
 *         description: Detalle del planeador creado
 *       400:
 *         description: Error en los datos
 */
router.post("/", DetallePlaneadorController.crear);

module.exports = router;
