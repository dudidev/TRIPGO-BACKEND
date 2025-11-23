const { Router } = require("express");
const {ServicioEstablecimientoController} = require("../controllers/servicioEstablecimientoController");

const router = Router();
router.post("/", ServicioEstablecimientoController.crear);
module.exports = router;
