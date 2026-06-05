export type EstadoOnboarding = 'pendiente' | 'en_revision' | 'aprobado' | 'rechazado';

export interface SolicitudOnboarding {
    id_solicitud: number;
    nombre_establecimiento: string;
    nombre_contacto: string;
    correo_contacto: string;
    descripcion: string;
    estado: EstadoOnboarding;
    token_formulario: string;
    token_expiracion: Date;
    datos_completos: DatosCompletos | null;
    fotos: string[] | null;
    servicios: string[] | null;
    created_at: Date;
    updated_at: Date;
}

// Payload POST /onboarding/solicitud-inicial
export interface CrearSolicitudDTO {
    nombre_establecimiento: string;
    nombre_contacto: string;
    correo_contacto: string;
    descripcion: string;
}

// Payload POST /onboarding/:token/completar
export interface CompletarSolicitudDTO {
    datos_completos: DatosCompletos;
    fotos: string[];       // mín 3, máx 8 — URLs Cloudinary
    servicios: string[];
}

export interface DatosCompletos {

    categoria: string;

    ubicacion: {
        departamento: string;
        municipio: string;
        direccion: string;
        googleMaps: string;
    };

    contacto: {
        representante: string;
        telefono: string;
        whatsapp: string;
    };

    experiencia: {
        descripcionCompleta: string;
        queHaceUnico: string;
    };
}