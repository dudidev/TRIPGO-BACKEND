const express  = require("express");
const usuarioRoutes = require("./usuarioRoutes");
const tipoRoutes = require("./tipoRoutes");
const establecimientoRoutes = require("./establecimientoRoutes");
const servicioRoutes = require("./servicioRoutes");
const servicioEstablecimientoRoutes = require("./servicioEstablecimientosRoutes");
const visitaRoutes = require("./visitaRoutes");
const comentarioRoutes = require("./comentarioRoutes");
const planeadorRoutes = require("./planeadorRoutes");
const detallePlaneadorRoutes = require("./detallePlaneadorRoutes");

const router = express.Router();

router.use("/usuarios", usuarioRoutes);
router.use("/tipos", tipoRoutes);
router.use("/establecimientos", establecimientoRoutes);
router.use("/servicios", servicioRoutes);
router.use("/servicios-establecimientos", servicioEstablecimientoRoutes);
router.use("/visitas", visitaRoutes);
router.use("/comentarios", comentarioRoutes);
router.use("/planeador", planeadorRoutes);
router.use("/detalles-planeador", detallePlaneadorRoutes);

router.get("/", (req, res) => res.json({ ok: true, message: "API TripGO" }));

module.exports = router;