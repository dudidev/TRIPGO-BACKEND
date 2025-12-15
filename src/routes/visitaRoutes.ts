const { Router } = require("express");
const { VisitaController } = require("../controllers/visitaController");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Visitas
 *   description: Gestión de visitas
 */

/**
 * @swagger
 * /api/visitas:
 *   post:
 *     summary: Registrar una visita
 *     tags: [Visitas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuario_id
 *               - establecimiento_id
 *             properties:
 *               usuario_id:
 *                 type: integer
 *                 example: 1
 *               establecimiento_id:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       201:
 *         description: Visita registrada
 *       400:
 *         description: Error en los datos
 */
router.post("/", VisitaController.crear);

module.exports = router;
