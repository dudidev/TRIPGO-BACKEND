import { Request, Response } from "express";
import DetallePlaneadorService from "../services/detallePlaneadorService.js";

class DetallePlaneadorController {

    static async crear(req: Request, res: Response) {
        try {
            const { id_planeador, id_servicio, cantidad, precio_unitario } = req.body;

            
            if (!id_planeador || !id_servicio) {
                return res.status(400).json({
                    ok: false,
                    message: "id_planeador e id_servicio son obligatorios"
                });
            }

            
            const r = await DetallePlaneadorService.crear({
                id_planeador,
                id_servicio,
                cantidad: cantidad || 1,
                precio_unitario
            });

            return res.status(201).json({
                ok: true,
                message: "Detalle agregado correctamente",
                data: r
            });

        } catch (error) {
            console.error("Error en crear detalle:", error);

            return res.status(500).json({
                ok: false,
                message: "Error al crear detalle",
                error
            });
        }
    }
}

export default DetallePlaneadorController;