import type { Request, Response } from "express";
import PlaneadorService from "../services/planeadorService.js";
import PlaneadorRepo from "../repositories/planeadorRepo.js";

class PlaneadorController {
    static async crear(req: Request, res: Response) {
        const r = await PlaneadorService.crear(req.body);
        res.status(201).json({ ok: true, r });
    }
    static async obtenerDetalle(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            const data = await PlaneadorRepo.obtenerDetalle(id);

            return res.json(data);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                message: "Error al obtener el planeador"
            });
        }
    }
}
export default PlaneadorController;