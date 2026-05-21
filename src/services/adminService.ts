import * as adminRepo from '../repositories/adminRepo.js';
import UsuarioRepo from '../repositories/usuarioRepo.js';
import EstablecimientoRepo from '../repositories/establecimientoRepo.js';
import { hashPassword, generateSecurePassword } from '../utils/password.js';
import { sendWelcomeEmail } from './emailService.js';
import { SolicitudOnboarding } from '../types/onboarding.types.js';

// ─── Helper: generar email @tripgoapp.com ─────────────────────────────────────

function generateBusinessEmail(nombre: string): string {
    return nombre
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "") + "@tripgoapp.com";
}

// ─── BE-07: Listar solicitudes ────────────────────────────────────────────────

export async function getSolicitudes(): Promise<SolicitudOnboarding[]> {
    return adminRepo.listarSolicitudes();
}

// ─── BE-08: Aprobar solicitud ─────────────────────────────────────────────────

export async function aprobarSolicitud(id: number): Promise<void> {
    const solicitud = await adminRepo.getSolicitudById(id);

    if (!solicitud) {
        const error = new Error('Solicitud no encontrada') as Error & { status?: number };
        error.status = 404;
        throw error;
    }

    if (solicitud.estado !== 'en_revision') {
        const error = new Error('Solo se pueden aprobar solicitudes en revisión') as Error & { status?: number };
        error.status = 409;
        throw error;
    }

    // Generar credenciales
    const credEmail = generateBusinessEmail(solicitud.nombre_establecimiento);
    const credPassword = generateSecurePassword();
    const hashedPwd = await hashPassword(credPassword);

    // Crear usuario empresa
    const resultUsuario = await UsuarioRepo.crear({
        nombre_usuario: solicitud.nombre_establecimiento,
        correo_usuario: credEmail,
        password_u: hashedPwd,
        rol: 'empresa',
        google_id: "",
        auth_provider: 'local'
    });

    const idUsuario = resultUsuario.insertId;

    // Crear establecimiento vinculado al usuario
    const resultEstablecimiento = await EstablecimientoRepo.crear({
        nombre_establecimiento: solicitud.nombre_establecimiento,
        descripcion: solicitud.descripcion,
        direccion: solicitud.datos_completos?.direccion ?? '',
        ubicacion: solicitud.datos_completos?.ubicacion ?? '',
        id_propietario: idUsuario,
        estado: 'activo',
        tipo: solicitud.datos_completos?.tipo ?? 1,
        horario_apertura: solicitud.datos_completos?.horario_apertura ?? '08:00',
        horario_cierre: solicitud.datos_completos?.horario_cierre ?? '18:00',
        telefono: solicitud.datos_completos?.telefono ?? '',
        correo: solicitud.correo_contacto,
    } as any);

    const idEstablecimiento = resultEstablecimiento.insertId;

    // Enviar correo de bienvenida con credenciales
    await sendWelcomeEmail({
        businessName: solicitud.nombre_establecimiento,
        contactName: solicitud.nombre_contacto,
        email: solicitud.correo_contacto,
        description: solicitud.descripcion,
        credPassword,
        businessId: String(idEstablecimiento),
    });

    // Marcar solicitud como aprobada
    await adminRepo.actualizarEstado(id, 'aprobado');
}