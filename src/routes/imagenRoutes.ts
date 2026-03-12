import express from "express";
const router = express.Router();

import upload from "../middlewares/upload.js";
import { subirImagenLugar, obtenerImagenesLugar } from "../controllers/imagenController.js";

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

export default router;