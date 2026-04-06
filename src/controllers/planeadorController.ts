import type { Request, Response } from "express";
import PlaneadorService from "../services/planeadorService.js";

class PlaneadorController {
    static async crear(req: Request, res: Response) {
        const r = await PlaneadorService.crear(req.body);
        res.status(201).json({ ok: true, r });
    }
}
export default PlaneadorController;