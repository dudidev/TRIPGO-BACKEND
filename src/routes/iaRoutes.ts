import { Router } from "express";
import { chatbotIA} from "../controllers/iaController.js";

const router = Router();

router.post("/chatbot", chatbotIA);

export default router;