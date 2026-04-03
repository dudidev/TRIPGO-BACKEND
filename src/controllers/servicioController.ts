// src/controllers/Servicio.controller.ts
import type { Request, Response } from "express";
import ServicioService from "../services/servicioService.js";

class ServicioController {
    static async listar(req: Request, res: Response) {
        const rows = await ServicioService.listar();
        res.json({ ok: true, data: rows });
    }
    static async crear(req: Request, res: Response) {
        const r = await ServicioService.crear(req.body);
        res.status(201).json({ ok: true, r });
    }

    static async porEstablecimiento(req: Request, res: Response) {
    try {
        const { id } = req.params;

        const rows = await ServicioService.porEstablecimiento(Number(id));

        res.json({
            servicios: rows
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error obteniendo servicios" });
    }
}
}
export default ServicioController;