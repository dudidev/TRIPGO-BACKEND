import type { Request, Response } from "express";
const { ServicioEstablecimientoService } = require("../services/servicioEstablecimientoService");

class ServicioEstablecimientoController {
    static async crear(req: Request, res: Response) {
        const r = await ServicioEstablecimientoService.crear(req.body);
        res.status(201).json({ ok: true, r });
    }
}
module.exports = { ServicioEstablecimientoController };