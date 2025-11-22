// src/controllers/Ubicacion.controller.ts
import type { Request, Response } from "express";
const { UbicacionService } = require("../services/ubicacionService");

class UbicacionController {
    static async listar(req: Request, res: Response) {
        const rows = await UbicacionService.listar();
        res.json({ ok: true, data: rows });
    }

    static async crear(req: Request, res: Response) {
        const result = await UbicacionService.crear(req.body);
        res.status(201).json({ ok: true, result });
    }
}
module.exports = { UbicacionController };