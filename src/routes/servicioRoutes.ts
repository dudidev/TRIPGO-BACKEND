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
 *     summary: Listar todos los servicios
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
 *     summary: Crear un servicio
 *     tags: [Servicios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - categoria
 *               - descripcion
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: WiFi
 *               categoria:
 *                 type: string
 *                 example: Tecnología
 *               descripcion:
 *                 type: string
 *                 example: Servicio de internet inalámbrico
 *     responses:
 *       201:
 *         description: Servicio creado correctamente
 *       400:
 *         description: Error en los datos
 */
router.post("/", ServicioController.crear);

/**
 * @swagger
 * /servicios/{id}:
 *   get:
 *     summary: Obtener servicios por establecimiento
 *     tags: [Servicios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del establecimiento
 *         schema:
 *           type: integer
 *           example: 3
 *     responses:
 *       200:
 *         description: Lista de servicios del establecimiento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 servicios:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       nombre:
 *                         type: string
 *                         example: Habitación estándar
 *                       categoria:
 *                         type: string
 *                         example: Hospedaje
 *                       precio:
 *                         type: number
 *                         example: 180000
 *       404:
 *         description: No se encontraron servicios
 */
router.get("/:id", ServicioController.porEstablecimiento);

export default router;