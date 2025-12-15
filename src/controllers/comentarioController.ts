import type { Request, Response } from "express";
const { ComentarioService } = require("../services/comentarioService");

class ComentarioController {
    static async crear(req: Request, res: Response) {
        const r = await ComentarioService.crear(req.body);
        res.status(201).json({ ok: true, r });
    }
    static async listarPorUbicacion(req: Request, res: Response) {
        const id = parseInt(req.params.id, 10);
        const r = await ComentarioService.listarPorUbicacion(id);
        res.json({ ok: true, data: r });
    }
}
module.exports = { ComentarioController };