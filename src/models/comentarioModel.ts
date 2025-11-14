export interface Comentario {
    id_comentarios?: number;
    comentario: string;
    id_usuario: number;
    id_ubicacion: number;
    id_establecimiento?: number | null;
    fecha_publicacion?: Date;
}
