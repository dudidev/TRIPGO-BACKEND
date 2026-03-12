import Router from "express"
import usuarioRoutes from "./usuarioRoutes.js";
import tipoRoutes from"./tipoRoutes.js";
import establecimientoRoutes from"./establecimientoRoutes.js";
import servicioRoutes from"./servicioRoutes.js";
import servicioEstablecimientoRoutes from"./servicioEstablecimientosRoutes.js";
import visitaRoutes from"./visitaRoutes.js";
import resenaRoutes from"./resenaRoutes.js";
import planeadorRoutes from"./planeadorRoutes.js";
import detallePlaneadorRoutes from"./detallePlaneadorRoutes.js";
import contactRoutes from"./contactRoutes.js";
import imagenRoutes from"./imagenRoutes.js";
import itinerarioRoutes from"./itinerarioRoutes.js";

const router = Router();


router.use("/usuarios", usuarioRoutes);
router.use("/tipos", tipoRoutes);
router.use("/establecimientos", establecimientoRoutes);
router.use("/servicios", servicioRoutes);
router.use("/servicios-establecimientos", servicioEstablecimientoRoutes);
router.use("/visitas", visitaRoutes);
router.use("/resenas", resenaRoutes);
router.use("/planeador", planeadorRoutes);
router.use("/detalles-planeador", detallePlaneadorRoutes);
router.use("/contact", contactRoutes);
router.use("/imagenes", imagenRoutes);
router.use("/itinerario", itinerarioRoutes);


router.get("/", (_req, _res) => _res.json({ ok: true, message: "API TripGO" }));

export default router;
