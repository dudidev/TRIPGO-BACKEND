import type { Request, Response } from "express";
const { PlaneadorService } = require("../services/planeadorService");

class PlaneadorController {
    static async crear(req: Request, res: Response) {
        const r = await PlaneadorService.crear(req.body);
        res.status(201).json({ ok: true, r });
    }
}
module.exports = { PlaneadorController };