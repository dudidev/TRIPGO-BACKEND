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

  static async listarPorUbicacionYTipo(req, res) {
    const { town, idTipo } = req.params;
    const rows = await EstablecimientoService.listarPorUbicacionYTipo(town, Number(idTipo));
    res.json({ ok: true, data: rows });
  }

  static async getMio(req: any, res: any) {
    return await EstablecimientoService.getMio(req, res);
  }

  static async updateMio(req: any, res: any) {
    return await EstablecimientoService.updateMio(req, res);
  }
}

module.exports = {
  EstablecimientoController
};
