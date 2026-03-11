import type { Request, Response } from "express";
import ServicioEstablecimientoService from "../services/servicioEstablecimientoService.js";

class ServicioEstablecimientoController {
    static async crear(req: Request, res: Response) {
        const r = await ServicioEstablecimientoService.crear(req.body);
        res.status(201).json({ ok: true, r });
    }
}
export default ServicioEstablecimientoController;