import type { Request, Response } from "express";
import TipoService from "../services/tipoService.js";

class TipoController {
    static async listar(req: Request, res: Response) {
        const rows = await TipoService.listar();
        res.json({ ok: true, data: rows });
    }


    static async listarPorUbicacion(req: Request, res: Response) {
        console.log(" LLEGÓ petición tipos por ubicacion:", req.params.town);
        const town = req.params.town;
        const rows = await TipoService.listarPorUbicacion(String(town));
        res.json({ ok: true, data: rows });
    }

    static async crear(req: Request, res: Response) {
        const r = await TipoService.crear(req.body);
        res.status(201).json({ ok: true, r });
    }
}
export default TipoController;