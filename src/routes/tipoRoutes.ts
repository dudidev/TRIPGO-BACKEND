const { Router } = require("express");
const { TipoController } = require("../controllers/tipoController");

const router = Router();
router.get("/", TipoController.listar);

module.exports = router;
