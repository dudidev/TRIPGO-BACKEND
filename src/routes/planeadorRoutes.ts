const { Router } = require("express");
const {PlaneadorController} = require("../controllers/planeadorController");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Planeador
 *   description: Gestión del planeador
 */

/**
 * @swagger
 * /api/planeador:
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

module.exports = router;
