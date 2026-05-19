import crypto from 'crypto';
import * as onboardingRepo from '../repositories/onboardingRepo.js';
import { sendOnboardingEmail } from './emailService.js';
import { CrearSolicitudDTO, CompletarSolicitudDTO, SolicitudOnboarding } from '../types/onboarding.types.js';

const TOKEN_EXPIRACION_HORAS = 72;
const MIN_FOTOS = 3;
const MAX_FOTOS = 8;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function generarExpiracion(): Date {
    const expiracion = new Date();
    expiracion.setHours(expiracion.getHours() + TOKEN_EXPIRACION_HORAS);
    return expiracion;
}

function tokenExpirado(solicitud: SolicitudOnboarding): boolean {
    return new Date() > new Date(solicitud.token_expiracion);
}

// ─── BE-02: Crear solicitud inicial ──────────────────────────────────────────

export async function crearSolicitudInicial(data: CrearSolicitudDTO): Promise<void> {
    const token = crypto.randomUUID();
    const expiracion = generarExpiracion();

    await onboardingRepo.crearSolicitud(data, token, expiracion);

    // Dispara correo con link al formulario completo
    await sendOnboardingEmail({
        email: data.correo_contacto,
        nombreContacto: data.nombre_contacto,
        nombreEstablecimiento: data.nombre_establecimiento,
        token,
    });
}

// ─── BE-04: Obtener solicitud por token ───────────────────────────────────────

export async function obtenerSolicitudPorToken(
    token: string
): Promise<{ solicitud: SolicitudOnboarding; expirado: boolean }> {
    const solicitud = await onboardingRepo.buscarPorToken(token);

    if (!solicitud) {
        const error = new Error('Token no encontrado') as Error & { status?: number };
        error.status = 404;
        throw error;
    }

    if (tokenExpirado(solicitud)) {
        const error = new Error('El enlace ha expirado. Comunícate con TripGO para solicitar uno nuevo.') as Error & { status?: number };
        error.status = 410;
        throw error;
    }

    return { solicitud, expirado: false };
}

// ─── BE-05: Completar onboarding (paso 2) ────────────────────────────────────

export async function completarOnboarding(
    token: string,
    payload: CompletarSolicitudDTO
): Promise<void> {
    // Validar que el token sigue siendo válido
    const solicitud = await onboardingRepo.buscarPorToken(token);

    if (!solicitud) {
        const error = new Error('Token no encontrado') as Error & { status?: number };
        error.status = 404;
        throw error;
    }

    if (tokenExpirado(solicitud)) {
        const error = new Error('El enlace ha expirado. Comunícate con TripGO para solicitar uno nuevo.') as Error & { status?: number };
        error.status = 410;
        throw error;
    }

    if (solicitud.estado === 'en_revision') {
        const error = new Error('Esta solicitud ya fue completada anteriormente.') as Error & { status?: number };
        error.status = 409;
        throw error;
    }

    if (solicitud.estado === 'aprobado' || solicitud.estado === 'rechazado') {
        const error = new Error('Esta solicitud ya fue procesada.') as Error & { status?: number };
        error.status = 409;
        throw error;
    }

    // Validar cantidad de fotos
    const { datos_completos, fotos, servicios } = payload;

    if (!Array.isArray(fotos) || fotos.length < MIN_FOTOS || fotos.length > MAX_FOTOS) {
        const error = new Error(`Debes subir entre ${MIN_FOTOS} y ${MAX_FOTOS} fotos.`) as Error & { status?: number };
        error.status = 400;
        throw error;
    }

    await onboardingRepo.completarSolicitud(token, datos_completos, fotos, servicios);
}