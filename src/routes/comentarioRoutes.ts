const { Router } = require("express");
const {ComentarioController} = require("../controllers/comentarioController");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Comentarios
 *   description: Gestión de comentarios
 */

/**
 * @swagger
 * /comentarios:
 *   post:
 *     summary: Crear un comentario
 *     tags: [Comentarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - contenido
 *               - usuario_id
 *               - ubicacion_id
 *             properties:
 *               contenido:
 *                 type: string
 *                 example: Excelente lugar para visitar
 *               usuario_id:
 *                 type: integer
 *                 example: 1
 *               ubicacion_id:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       201:
 *         description: Comentario creado
 *       400:
 *         description: Error en los datos
 */
router.post("/", ComentarioController.crear);

/**
 * @swagger
 * /comentarios/ubicacion/{id}:
 *   get:
 *     summary: Listar comentarios por ubicación
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la ubicación
 *     responses:
 *       200:
 *         description: Lista de comentarios
 *       404:
 *         description: Ubicación no encontrada
 */
router.get("/ubicacion/:id", ComentarioController.listarPorUbicacion);

module.exports = router;
