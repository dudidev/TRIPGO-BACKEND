const { Router } = require("express");
const ResenaController = require("../controllers/resenaController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Reseñas
 *   description: Sistema de calificaciones y reseñas de establecimientos
 */

/**
 * @swagger
 * /resenas:
 *   post:
 *     summary: Crear una nueva reseña
 *     description: Permite a un usuario autenticado publicar una reseña con calificación en un establecimiento
 *     tags: [Reseñas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_establecimiento
 *               - calificacion
 *               - comentario
 *             properties:
 *               id_establecimiento:
 *                 type: integer
 *                 example: 5
 *               calificacion:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 4
 *               comentario:
 *                 type: string
 *                 minLength: 10
 *                 example: "Excelente lugar, muy recomendado para familias"
 *     responses:
 *       201:
 *         description: Reseña creada exitosamente
 *       400:
 *         description: Datos inválidos o ya existe una reseña del usuario
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.post("/", verifyToken, ResenaController.crear);

/**
 * @swagger
 * /resenas/mis-resenas:
 *   get:
 *     summary: Obtener mis reseñas
 *     description: Lista todas las reseñas del usuario autenticado
 *     tags: [Reseñas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de reseñas del usuario
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get("/mis-resenas", verifyToken, ResenaController.listarMisResenas);

/**
 * @swagger
 * /resenas/{id}:
 *   get:
 *     summary: Obtener una reseña específica
 *     tags: [Reseñas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la reseña
 *     responses:
 *       200:
 *         description: Reseña encontrada
 *       404:
 *         description: Reseña no encontrada
 */
router.get("/:id", ResenaController.obtenerPorId);

/**
 * @swagger
 * /resenas/{id}:
 *   put:
 *     summary: Actualizar mi reseña
 *     description: Permite editar una reseña existente (solo el autor)
 *     tags: [Reseñas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               calificacion:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *               comentario:
 *                 type: string
 *                 minLength: 10
 *                 example: "Actualizo mi opinión, es increíble"
 *     responses:
 *       200:
 *         description: Reseña actualizada
 *       400:
 *         description: Error al actualizar
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.put("/:id", verifyToken, ResenaController.actualizar);

/**
 * @swagger
 * /resenas/{id}:
 *   delete:
 *     summary: Eliminar mi reseña
 *     description: Permite eliminar una reseña existente (solo el autor)
 *     tags: [Reseñas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reseña eliminada
 *       400:
 *         description: Error al eliminar
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.delete("/:id", verifyToken, ResenaController.eliminar);

module.exports = router;