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
 *               nombre_establecimiento:
 *                 type: string
 *                 example: "Hotel TripGO"
 *               direccion:
 *                 type: string
 *                 example: "Calle 123 #45-67"
 *               horario_apertura:
 *                 type: string
 *                 format: time
 *                 example: "08:00:00"
 *               horario_cierre:
 *                 type: string
 *                 format: time
 *                 example: "20:00:00"
 *               estado:
 *                 type: string
 *                 enum:
 *                   - activo
 *                   - inactivo
 *                 example: "activo"
 *               descripcion:
 *                 type: string
 *                 example: "Un lugar acogedor para todo tipo de viajeros."
 *               id_propietario:
 *                 type: integer
 *                 example: 5
 *               telefono:
 *                 type: string
 *                 example: "+573112345678"
 *               correo:
 *                 type: string
 *                 example: "hotel@tripgo.com"
 *               tipo:
 *                 type: integer
 *                 example: 2
 *               comentarios:
 *                 type: string
 *                 example: "Excelente servicio y ubicación."
 *     responses:
 *       201:
 *         description: Establecimiento creado
 *       400:
 *         description: Error en los datos
 */
router.post("/", EstablecimientoController.crear);

module.exports = router;
