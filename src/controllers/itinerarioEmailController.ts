import type { Request, Response } from "express";
const { sendItinerarioEmail } = require("../services/emailService");

const enviarItinerarioEmail = async(req: Request, res: Response): Promise<void> => {
    const { email, nombre, items } = req.body;

    if (!email || !nombre || !Array.isArray(items) || items.length === 0) {
        res.status(400).json({ error: "Faltan campos requeridos: email, nombre, items[]" });
        return;
    }

    try {
        await sendItinerarioEmail({ email, nombre, items });
        res.status(200).json({ ok: true, message: "Itinerario enviado correctamente" });
    } catch (error: any) {
        console.error("❌ [itinerarioEmailController] Error:", error.message);
        res.status(500).json({ error: "No se pudo enviar el correo del itinerario" });
    }
}

module.exports = { enviarItinerarioEmail };