// src/routes/usuarioImagenRoutes.js
const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload");
const { subirFotoPerfil } = require("../controllers/usuarioImagenController");



// PUT porque actualiza recurso existente
router.put(
  "/:id/foto",
  upload.single("imagen"),
  subirFotoPerfil
);

module.exports = router;