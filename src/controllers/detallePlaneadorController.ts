import type { Request, Response } from "express";
const { DetallePlaneadorService } = require("../services/detallePlaneadorService");

class DetallePlaneadorController {
    static async crear(req: Request, res: Response) {
        const r = await DetallePlaneadorService.crear(req.body);
        res.status(201).json({ ok: true, r });
    }
}
module.exports = { DetallePlaneadorController };