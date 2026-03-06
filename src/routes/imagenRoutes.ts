const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload");
const { subirImagenLugar, obtenerImagenesLugar } = require("../controllers/imagenController");

router.post(
  "/lugares/:id/imagenes",
  upload.single("imagen"),
  subirImagenLugar
);

// Obtener imágenes de un lugar
router.get(
  "/lugares/:id/imagenes",
  obtenerImagenesLugar
);

module.exports = router;