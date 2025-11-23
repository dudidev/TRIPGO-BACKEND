const { Router } = require("express");
const { VisitaController } = require("../controllers/visitaController");

const router = Router();
router.post("/", VisitaController.crear);

module.exports = router;
