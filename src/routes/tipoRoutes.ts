const { Router } = require("express");
const { TipoController } = require("../controllers/tipoController");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tipos
 *   description: Gestión de tipos
 */

/**
 * @swagger
 * /tipos:
 *   get:
 *     summary: Listar tipos
 *     tags: [Tipos]
 *     responses:
 *       200:
 *         description: Lista de tipos
 */
router.get("/", TipoController.listar);

module.exports = router;
