export interface HistorialVisualizacion {
    id_historial?: number;
    id_usuario: number;
    id_establecimiento: number;
    fecha_visita?: Date;
    tiempo_visualizacion?: number;
}

export interface PreferenciaUsuario {
    id?: number;
    id_usuario: number;
    tipos_favoritos: TipoFavorito[];
    ubicaciones_favoritas: string[];
    promedio_calificaciones: number;
    total_interacciones: number;
    ultima_actualizacion?: Date;
}

export interface TipoFavorito {
    id_tipo: number;
    nombre_tipo: string;
    score: number;
}

export interface RecomendacionPersonalizada {
    id_establecimiento: number;
    nombre_establecimiento: string;
    tipo: number;
    nombre_tipo: string;
    ubicacion: string;
    direccion?: string;
    latitud?: number;
    longitud?: number;
    calificacion_promedio: number;
    total_resenas: number;
    descripcion?: string;
    telefono?: string;
    correo?: string;
    horario_apertura?: string;
    horario_cierre?: string;
    score_relevancia: number;
    razon: string;
}

export interface PerfilUsuario {
    tipos_favoritos: TipoFavorito[];
    ubicaciones_favoritas: { ubicacion: string; visitas: number }[];
    promedio_calificaciones_dadas: number;
    total_interacciones: number;
}

export interface RegistrarVisualizacionDTO {
    id_establecimiento: number;
    tiempo_visualizacion?: number;
}