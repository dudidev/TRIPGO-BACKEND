import { Router } from "express";
import { chatbotIA, recomendacionesIA } from "../controllers/iaController.js";

const router = Router();

router.post("/chatbot", chatbotIA);

router.get("/recomendaciones", recomendacionesIA);

export default router;