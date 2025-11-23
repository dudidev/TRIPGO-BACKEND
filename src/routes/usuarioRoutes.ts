const { Router } = require("express");
const { UsuarioController } = require("../controllers/usuarioControllers");

const router = Router();

router.post("/", UsuarioController.crear);
router.get("/", UsuarioController.listar);
router.post("/login", UsuarioController.login);

module.exports = router;