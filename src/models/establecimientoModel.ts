export interface Establecimiento {
    id_establecimiento?: number;
    nombre_establecimiento: string;
    direccion?: string;
    ubicacion?: number;
    horario_apertura?: string;
    horario_cierre?: string;
    estado?: "activo" | "inactivo";
    descripcion?: string;
    id_propietario?: number;
    telefono?: string;
    correo?: string;
    tipo?: number;
}
