// src/controllers/Tipo.controller.ts
import type { Request, Response } from "express";
const { TipoService } = require("../services/tipoService");

class TipoController {
    static async listar(req: Request, res: Response) {
        const rows = await TipoService.listar();
        res.json({ ok: true, data: rows });
    }

    static async listarPorUbicacion(req: Request, res: Response) {
    const { town } = req.params;
    const rows = await TipoService.listarPorUbicacion(town);
    res.json({ ok: true, data: rows });
  }
  
    static async crear(req: Request, res: Response) {
        const r = await TipoService.crear(req.body);
        res.status(201).json({ ok: true, r });
    }
}
module.exports = { TipoController };