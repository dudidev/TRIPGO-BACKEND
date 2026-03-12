import Router from "express";
import enviarItinerarioEmail from "../controllers/itinerarioEmailController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();
router.post("/enviar-email", verifyToken, enviarItinerarioEmail);

export default router;