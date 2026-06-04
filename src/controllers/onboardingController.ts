import { Request, Response, NextFunction } from 'express';
import * as onboardingService from '../services/onboardingService.js';

// ─── BE-02: POST /onboarding/solicitud-inicial ───────────────────────────────

export async function crearSolicitudInicial(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const { nombre_establecimiento, nombre_contacto, correo_contacto, descripcion } = req.body;

        await onboardingService.crearSolicitudInicial({
            nombre_establecimiento,
            nombre_contacto,
            correo_contacto,
            descripcion,
        });

        res.status(201).json({
            message: 'Solicitud recibida. Revisa tu correo para continuar con el proceso.',
        });
    } catch (error) {
        next(error);
    }
}

// ─── BE-04: GET /onboarding/:token ──────────────────────────────────────────

export async function getSolicitudPorToken(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const token = req.params['token'];

        if (!token) {
            res.status(400).json({ message: 'Token requerido.' });
            return;
        }

        const { solicitud } = await onboardingService.obtenerSolicitudPorToken(token);

        res.status(200).json({
    id_solicitud: solicitud.id_solicitud,

    nombre_establecimiento:
        solicitud.nombre_establecimiento,

    nombre_contacto:
        solicitud.nombre_contacto,

    correo_contacto:
        solicitud.correo_contacto,

    descripcion:
        solicitud.descripcion,

    estado:
        solicitud.estado,

    datos_completos:
        solicitud.datos_completos,

    servicios:
        solicitud.servicios,

    fotos:
        solicitud.fotos
});
    } catch (error) {
        next(error);
    }
}

// ─── BE-05: POST /onboarding/:token/completar ───────────────────────────────

export async function completarOnboarding(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const token = req.params['token'];

        if (!token) {
            res.status(400).json({ message: 'Token requerido.' });
            return;
        }

        const { datos_completos, fotos, servicios } = req.body;

        await onboardingService.completarOnboarding(token, {
            datos_completos,
            fotos,
            servicios,
        });

        res.status(200).json({
            message: 'Solicitud completada. Estamos revisando tu información y te contactaremos pronto.',
        });
    } catch (error) {
        next(error);
    }
}

// ─── PATCH /onboarding/:id/rechazar ──────────────────────────────────

export async function rechazarOnboarding(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {

    try {

        const idSolicitud = Number(req.params['id']);

        const { motivo } = req.body;

        await onboardingService.rechazarOnboarding(
            idSolicitud,
            motivo
        );

        res.status(200).json({
            message: 'Solicitud rechazada correctamente.',
        });

    } catch (error) {
        next(error);
    }
}