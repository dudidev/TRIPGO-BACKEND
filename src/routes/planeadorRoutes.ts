const { Router } = require("express");
const {PlaneadorController} = require("../controllers/planeadorController");

const router = Router();
router.post("/", PlaneadorController.crear);

module.exports = router;
