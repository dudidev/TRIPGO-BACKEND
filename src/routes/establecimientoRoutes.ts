const { Router } = require("express");

// ✅ Importa la clase + handlers sueltos
const {
  EstablecimientoController,
  getMio,
  updateMio
} = require("../controllers/establecimientoController");

// ✅ Middlewares
const { verifyToken, requireEmpresa } = require("../middlewares/authMiddleware");

const router = Router();

/**
 * ✅ IMPORTANTE: las rutas dinámicas deben ir ANTES de "/" si no, Express puede no matchear bien en algunos casos
 * y además debes poner /mio ANTES de /:town para que no intente tomar "mio" como town.
 */

// ✅ Mi establecimiento (solo empresa)
router.get("/mio", verifyToken, requireEmpresa, getMio);

// ✅ Actualizar mi establecimiento (solo empresa)
router.put("/mio", verifyToken, requireEmpresa, updateMio);

// ✅ FILTRO por ubicacion + tipo
// URL: /api/establecimientos/salento/tipo/1
router.get("/:town/tipo/:idTipo", EstablecimientoController.listarPorUbicacionYTipo);

// ✅ Listar todos
router.get("/", EstablecimientoController.listar);

// ✅ Crear
router.post("/", EstablecimientoController.crear);

module.exports = router;