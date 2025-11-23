const { Router } = require("express");
const {ComentarioController} = require("../controllers/comentarioController");

const router = Router();
router.post("/", ComentarioController.crear);
router.get("/ubicacion/:id", ComentarioController.listarPorUbicacion);

module.exports = router;
