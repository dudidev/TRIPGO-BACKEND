import express from "express";
import rateLimit from "express-rate-limit";
import { sendContactEmail } from "../services/emailService.js";

const router = express.Router();

// ─── Rate Limiting — máx. 5 solicitudes por IP cada 15 min ───────────────────
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: { ok: false, message: "Demasiados intentos. Espera unos minutos." },
});

// ─── Helpers ──────────────────────────────────────────────────────────────────
function isValidEmail(email:any) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitize(str = "") {
    return str.trim().replace(/<[^>]*>/g, "");
}

// ─── POST /contact ────────────────────────────────────────────────────────────
router.post("/", contactLimiter, async (req, res, next) => {
    try {
        const name = sanitize(req.body?.name);
        const email = sanitize(req.body?.email);
        const message = sanitize(req.body?.message);

        // Validaciones
        if (!name || name.length < 2)
            return res.status(400).json({ ok: false, message: "Nombre inválido." });

        if (!email || !isValidEmail(email))
            return res.status(400).json({ ok: false, message: "Email inválido." });

        if (!message || message.length < 10)
            return res.status(400).json({ ok: false, message: "Mensaje demasiado corto." });

        await sendContactEmail({ name, email, message });

        return res.status(200).json({ ok: true, message: "¡Mensaje enviado con éxito!" });

    } catch (error) {
        next(error); // delega al errorMiddleware existente
    }
});

export default router;