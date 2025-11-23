const { Router } = require("express");
const {DetallePlaneadorController} = require("../controllers/detallePlaneadorController");

const router = Router();
router.post("/", DetallePlaneadorController.crear);

module.exports = router;
