export interface Resena {
    id_resena?: number;
    id_usuario: number;
    id_establecimiento: number;
    calificacion: number;
    comentario: string;
    fecha_creacion?: Date;
    fecha_edicion?: Date | null;
}

export interface ResenaConUsuario extends Resena {
    usuario: {
        id: number;
        nombre_usuario: string;
        foto_perfil: string | null;
    };
    es_mia?: boolean;
}

export interface CrearResenaDTO {
    id_establecimiento: number;
    calificacion: number;
    comentario: string;
}

export interface ActualizarResenaDTO {
    calificacion?: number;
    comentario?: string;
}

export interface EstadisticasResenas {
    promedio: number;
    total: number;
    distribucion: {
        [key: number]: number; // { 5: 10, 4: 5, 3: 2, 2: 1, 1: 0 }
    };
}