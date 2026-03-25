export interface EnviarMensajeSoporteDTO {
    categoria: string;
    prioridad: string;
    asunto: string;
    descripcion: string;
}

export interface DatosUsuarioSoporte {
    id: number;
    nombre_usuario: string;
    correo_usuario: string;
}

/*
export enum CategoriaSoporte {
    TECNICO = 'tecnico',
    CUENTA = 'cuenta',
    GENERAL = 'general',
    SUGERENCIA = 'sugerencia'
}

export enum PrioridadSoporte {
    BAJA = 'baja',
    MEDIA = 'media',
    ALTA = 'alta',
    URGENTE = 'urgente'
}
*/