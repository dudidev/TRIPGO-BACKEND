const { Router } = require("express");
const { ServicioController } = require("../controllers/servicioController");

const router = Router();
router.get("/", ServicioController.listar);
router.post("/", ServicioController.crear);

module.exports = router;
