const { Router } = require("express");
const {EstablecimientoController} = require("../controllers/establecimientoController");
const { verifyToken, requireEmpresa } = require("../middlewares/authMiddleware");

const router = Router();

/**
 * @swagger
 * /establecimientos:
 *   get:
 *     summary: Listar todos los establecimientos
 *     description: Obtiene una lista de todos los establecimientos turísticos activos
 *     tags: [Establecimientos]
 *     responses:
 *       200:
 *         description: Lista de establecimientos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Establecimiento'
 *             example:
 *               - id_establecimiento: 1
 *                 nombre_establecimiento: "Hotel Campestre La Bella"
 *                 direccion: "Vía Armenia - Montenegro Km 5"
 *                 ubicacion: "Montenegro, Quindío"
 *                 latitud: 4.5639
 *                 longitud: -75.7847
 *                 horario_apertura: "08:00:00"
 *                 horario_cierre: "20:00:00"
 *                 estado: "activo"
 *                 tipo: 1
 *                 telefono: "3101234567"
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/", EstablecimientoController.listar);

/**
 * @swagger
 * /establecimientos:
 *   post:
 *     summary: Crear un nuevo establecimiento
 *     description: Crea un nuevo establecimiento turístico (requiere rol empresa)
 *     tags: [Establecimientos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Establecimiento'
 *           example:
 *             nombre_establecimiento: "Restaurante El Mirador"
 *             direccion: "Calle 21 # 14-45"
 *             ubicacion: "Armenia, Quindío"
 *             latitud: 4.5389
 *             longitud: -75.6811
 *             horario_apertura: "11:00:00"
 *             horario_cierre: "21:00:00"
 *             descripcion: "Restaurante con vista panorámica"
 *             telefono: "3109876543"
 *             correo: "info@elmirador.com"
 *             tipo: 2
 *     responses:
 *       201:
 *         description: Establecimiento creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Establecimiento creado"
 *                 id:
 *                   type: integer
 *                   example: 15
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post("/", EstablecimientoController.crear);

/**
 * @swagger
 * /establecimientos/mios:
 *   get:
 *     summary: Obtener mis establecimientos
 *     description: Lista todos los establecimientos del propietario autenticado
 *     tags: [Establecimientos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de establecimientos del propietario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Establecimiento'
 *             example:
 *               - id_establecimiento: 1
 *                 nombre_establecimiento: "Hotel La Bella"
 *                 id_propietario: 5
 *                 estado: "activo"
 *               - id_establecimiento: 2
 *                 nombre_establecimiento: "Restaurante Típico"
 *                 id_propietario: 5
 *                 estado: "activo"
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/mios", verifyToken, requireEmpresa, EstablecimientoController.getMios);

/**
 * @swagger
 * /establecimientos/mio:
 *   get:
 *     summary: Obtener mi establecimiento principal
 *     description: Retorna el primer establecimiento del propietario autenticado
 *     tags: [Establecimientos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Establecimiento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Establecimiento'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/mio", verifyToken, requireEmpresa, EstablecimientoController.getMio);

/**
 * @swagger
 * /establecimientos/mio:
 *   put:
 *     summary: Actualizar mi establecimiento principal
 *     description: Actualiza el primer establecimiento del propietario autenticado
 *     tags: [Establecimientos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Establecimiento'
 *     responses:
 *       200:
 *         description: Establecimiento actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.put("/mio", verifyToken, requireEmpresa, EstablecimientoController.updateMio);

/**
 * @swagger
 * /establecimientos/mios/{id}:
 *   put:
 *     summary: Actualizar un establecimiento específico
 *     description: Actualiza un establecimiento del propietario autenticado por ID
 *     tags: [Establecimientos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del establecimiento a actualizar
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Establecimiento'
 *     responses:
 *       200:
 *         description: Establecimiento actualizado
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.put("/mios/:id", verifyToken, requireEmpresa, EstablecimientoController.updateMioById);

/**
 * @swagger
 * /establecimientos/{town}/tipo/{idTipo}:
 *   get:
 *     summary: Filtrar establecimientos por ubicación y tipo
 *     description: Obtiene establecimientos filtrados por municipio y tipo
 *     tags: [Establecimientos]
 *     parameters:
 *       - in: path
 *         name: town
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del municipio
 *         example: "salento"
 *       - in: path
 *         name: idTipo
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de establecimiento
 *         example: 1
 *     responses:
 *       200:
 *         description: Lista de establecimientos filtrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Establecimiento'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/:town/tipo/:idTipo", EstablecimientoController.listarPorUbicacionYTipo);

module.exports = router;