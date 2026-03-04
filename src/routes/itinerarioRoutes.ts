// src/routes/itinerarioRoutes.ts

const { Router } = require ("express");
const { enviarItinerarioEmail } = require ("../controllers/itinerarioEmailController");
const { verifyToken } = require ("../middlewares/authMiddleware") ; // protege la ruta con JWT

const router = Router();

// POST /api/itinerario/enviar-email
// Requiere usuario autenticado (JWT)
router.post("/enviar-email", verifyToken, enviarItinerarioEmail);

module.exports = router;