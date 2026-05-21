import { Request, Response, NextFunction } from 'express';
import * as adminService from '../services/adminService.js';

// ─── BE-07: GET /admin/solicitudes ───────────────────────────────────────────

export async function listarSolicitudes(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const solicitudes = await adminService.getSolicitudes();
        res.status(200).json({ solicitudes });
    } catch (error) {
        next(error);
    }
}

// ─── BE-08: POST /admin/solicitudes/:id/aprobar ──────────────────────────────

export async function aprobar(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const id = Number(req.params['id']);

        if (!id || isNaN(id)) {
            res.status(400).json({ message: 'ID de solicitud inválido.' });
            return;
        }

        await adminService.aprobarSolicitud(id);

        res.status(200).json({
            message: 'Solicitud aprobada. Credenciales enviadas al negocio.',
        });
    } catch (error) {
        next(error);
    }
}