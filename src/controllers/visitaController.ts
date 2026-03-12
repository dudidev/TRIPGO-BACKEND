import type { Request, Response } from "express";
import VisitaService from "../services/visitaService.js";

class VisitaController {
    static async crear(req: Request, res: Response) {
        const r = await VisitaService.crear(req.body);
        res.status(201).json({ ok: true, r });
    }
}
export default VisitaController;