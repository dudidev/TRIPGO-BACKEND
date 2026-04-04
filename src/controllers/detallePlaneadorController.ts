import { Request, Response } from "express";
import  DetallePlaneadorService from "../services/detallePlaneadorService.js";

class DetallePlaneadorController {
    static async crear(req: Request, res: Response) {
        const r = await DetallePlaneadorService.crear(req.body);
        res.status(201).json({ ok: true, r });
    }
}
export default DetallePlaneadorController ;