export interface Usuario {
    id?: number;
    nombre_usuario: string;
    correo_usuario: string;
    password_u: string;
    fecha_registro?: Date;
    rol?: "usuario" | "empresa";
}
