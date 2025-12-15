// src/controllers/Servicio.controller.ts
import type { Request, Response } from "express";
const  {ServicioService}  = require("../services/servicioService");

class ServicioController {
    static async listar(req: Request, res: Response) {
        const rows = await ServicioService.listar();
        res.json({ ok: true, data: rows });
    }
    static async crear(req: Request, res: Response) {
        const r = await ServicioService.crear(req.body);
        res.status(201).json({ ok: true, r });
    }
}
module.exports = { ServicioController };