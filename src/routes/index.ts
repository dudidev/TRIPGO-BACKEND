// src/routes/index.ts
const { Router } = require("express");
import usuarioRoutes = require("./usuarioRoutes");
import ubicacionRoutes = require("./ubicacionRoutes");
import tipoRoutes = require("./tipoRoutes");
import establecimientoRoutes = require("./establecimientoRoutes");
import servicioRoutes = require("./servicioRoutes");
import servicioEstablecimientoRoutes = require("./servicioEstablecimientosRoutes");
import visitaRoutes = require("./visitaRoutes");
import comentarioRoutes = require("./comentarioRoutes");
import planeadorRoutes = require("./planeadorRoutes");
import detallePlaneadorRoutes = require("./detallePlaneadorRoutes");

const router = Router();

router.use("/usuarios", usuarioRoutes);
router.use("/ubicaciones", ubicacionRoutes);
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