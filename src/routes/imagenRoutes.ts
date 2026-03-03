const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload");
const { subirImagenLugar } = require("../controllers/imagenController");

router.post(
  "/lugares/:id/imagenes",
  upload.single("imagen"),
  subirImagenLugar
);

module.exports = router;