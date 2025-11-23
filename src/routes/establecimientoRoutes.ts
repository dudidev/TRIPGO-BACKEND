const { Router } = require("express");
const { EstablecimientoController } = require("../controllers/establecimientoController");

const router = Router();
router.get("/", EstablecimientoController.listar);
router.post("/", EstablecimientoController.crear);

module.exports = router;
