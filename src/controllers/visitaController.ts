// src/controllers/Visita.controller.ts
import type { Request, Response } from "express";
const { VisitaService } = require("../services/visitaService");

class VisitaController {
    static async crear(req: Request, res: Response) {
        const r = await VisitaService.crear(req.body);
        res.status(201).json({ ok: true, r });
    }
}
module.exports = { VisitaController };