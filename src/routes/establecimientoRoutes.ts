const { Router } = require("express");

// ✅ Importa la clase + handlers sueltos
const {EstablecimientoController} = require("../controllers/establecimientoController");

// Middlewares
const { verifyToken, requireEmpresa } = require("../middlewares/authMiddleware");

const router = Router();

/**
 *  IMPORTANTE: las rutas dinámicas deben ir ANTES de "/" si no, Express puede no matchear bien en algunos casos
 * y además debes poner /mio ANTES de /:town para que no intente tomar "mio" como town.
 */

//  Mis establecimientos (todos) (solo empresa)
router.get("/mios", verifyToken, requireEmpresa, getMios);

//  Actualizar 1 establecimiento mío por id (solo empresa)
router.put("/mios/:id", verifyToken, requireEmpresa, updateMioById);

//  Mi establecimiento (solo empresa)
router.get("/mio", verifyToken, requireEmpresa, getMio);

//  Actualizar mi establecimiento (solo empresa)
router.put("/mio", verifyToken, requireEmpresa, updateMio);
// ✅ Mi establecimiento (solo empresa)
router.get("/mio", verifyToken, requireEmpresa, EstablecimientoController.getMio);

// ✅ Actualizar mi establecimiento (solo empresa)
router.put("/mio", verifyToken, requireEmpresa, EstablecimientoController.updateMio);

//  FILTRO por ubicacion + tipo
// URL: /api/establecimientos/salento/tipo/1
router.get("/:town/tipo/:idTipo", EstablecimientoController.listarPorUbicacionYTipo);

//  Listar todos
router.get("/", EstablecimientoController.listar);

//  Crear
router.post("/", EstablecimientoController.crear);

module.exports = router;