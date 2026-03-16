import { Router } from "express";
import {
  agregarFavorito,
  eliminarFavorito,
  obtenerFavoritos
} from "../controllers/favoritosController.js";

const router = Router();

router.post("/", agregarFavorito);

router.delete(
  "/:id_usuario/:id_establecimiento",
  eliminarFavorito
);

router.get("/:id_usuario", obtenerFavoritos);

export default router;