const { Router } = require("express");
const { UbicacionController } = require("../controllers/ubicacionController");

const router = Router();
router.get("/", UbicacionController.listar);
router.post("/", UbicacionController.crear);

module.exports = router;
