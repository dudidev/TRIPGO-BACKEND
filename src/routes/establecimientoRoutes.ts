const { Router } = require("express");

// ✅ Importa la clase (listar/crear) y los handlers sueltos (mio)
const {
  EstablecimientoController,
  getMio,
  updateMio
} = require("../controllers/establecimientoController");

// ✅ Middlewares
const { verifyToken, requireEmpresa } = require("../middlewares/authMiddleware");

const router = Router();

// Listar establecimientos
router.get("/", EstablecimientoController.listar);

// Crear establecimiento
router.post("/", EstablecimientoController.crear);

// ✅ Mi establecimiento (solo empresa)
router.get("/mio", verifyToken, requireEmpresa, getMio);

// ✅ Actualizar mi establecimiento (solo empresa)
router.put("/mio", verifyToken, requireEmpresa, updateMio);

module.exports = router;
