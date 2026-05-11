import express from "express";
const router = express.Router();

import upload from "../middlewares/upload.js";

import {
  subirImagenLugar,
  obtenerImagenesLugar
} from "../controllers/imagenController.js";


router.post(
  "/lugares/:id/imagenes",
  upload.array("imagenes", 10),
  subirImagenLugar
);


router.get(
  "/lugares/:id/imagenes",
  obtenerImagenesLugar
);

export default router;