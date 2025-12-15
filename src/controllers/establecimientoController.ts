// src/controllers/Establecimiento.controller.ts
import type { Request, Response } from "express";
const { EstablecimientoService } = require("../services/establecimientoService");

class EstablecimientoController {
    static async listar(req: Request, res: Response) {
        const rows = await EstablecimientoService.listar();
        res.json({ ok: true, data: rows });
    }
    static async crear(req: Request, res: Response) {
        const r = await EstablecimientoService.crear(req.body);
        res.status(201).json({ ok: true, r });
    }
}
module.exports = { EstablecimientoController };