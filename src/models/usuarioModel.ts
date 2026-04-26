export interface Usuario {
    id?: number;
    nombre_usuario: string;
    correo_usuario: string;
    password_u?: string | null;
    fecha_registro?: Date;
    rol?: "usuario" | "empresa";
    google_id?: string;
    auth_provider?: string;
}
