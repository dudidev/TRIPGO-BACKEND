const resenaRepo = require("../repositories/resenaRepo");
import type { CrearResenaDTO, ActualizarResenaDTO } from "../models/resenaModel";

class ResenaService {
    async crear(idUsuario: number, data: CrearResenaDTO) {
        if (!data.id_establecimiento || !data.calificacion || !data.comentario) {
            throw new Error("Todos los campos son obligatorios");
        }

        if (data.calificacion < 1 || data.calificacion > 5) {
            throw new Error("La calificación debe estar entre 1 y 5");
        }

        if (data.comentario.trim().length < 10) {
            throw new Error("El comentario debe tener al menos 10 caracteres");
        }

        const establecimientoExiste = await resenaRepo.establecimientoExiste(data.id_establecimiento);
        if (!establecimientoExiste) {
            throw new Error("El establecimiento no existe");
        }

        const tieneResena = await resenaRepo.usuarioTieneResena(idUsuario, data.id_establecimiento);
        if (tieneResena) {
            throw new Error("Ya has publicado una reseña en este establecimiento. Puedes editarla si deseas.");
        }

        const idResena = await resenaRepo.crear(idUsuario, data);

        return await resenaRepo.obtenerPorId(idResena);
    }

    async listarPorEstablecimiento(idEstablecimiento: number, idUsuarioLogueado?: number) {
        const resenas = await resenaRepo.listarPorEstablecimiento(idEstablecimiento);
        const estadisticas = await resenaRepo.obtenerEstadisticas(idEstablecimiento);

        const resenasConFlag = resenas.map((r: any) => ({
            id_resena: r.id_resena,
            calificacion: r.calificacion,
            comentario: r.comentario,
            fecha_creacion: r.fecha_creacion,
            fecha_edicion: r.fecha_edicion,
            usuario: {
                id: r.id,
                nombre_usuario: r.nombre_usuario,
                foto_perfil: r.foto_perfil
            },
            es_mia: idUsuarioLogueado ? r.id_usuario === idUsuarioLogueado : false
        }));

        return {
            estadisticas,
            resenas: resenasConFlag
        };
    }

    async listarMisResenas(idUsuario: number) {
        return await resenaRepo.listarPorUsuario(idUsuario);
    }

    async actualizar(idResena: number, idUsuario: number, data: ActualizarResenaDTO) {
        const resena = await resenaRepo.obtenerPorId(idResena);

        if (!resena) {
            throw new Error("Reseña no encontrada");
        }

        if (resena.id_usuario !== idUsuario) {
            throw new Error("No tienes permiso para editar esta reseña");
        }

        if (data.calificacion !== undefined && (data.calificacion < 1 || data.calificacion > 5)) {
            throw new Error("La calificación debe estar entre 1 y 5");
        }

        if (data.comentario !== undefined && data.comentario.trim().length < 10) {
            throw new Error("El comentario debe tener al menos 10 caracteres");
        }

        await resenaRepo.actualizar(idResena, data);

        return await resenaRepo.obtenerPorId(idResena);
    }

    async eliminar(idResena: number, idUsuario: number) {
        const resena = await resenaRepo.obtenerPorId(idResena);

        if (!resena) {
            throw new Error("Reseña no encontrada");
        }

        if (resena.id_usuario !== idUsuario) {
            throw new Error("No tienes permiso para eliminar esta reseña");
        }

        await resenaRepo.eliminar(idResena);
    }

    async obtenerPorId(idResena: number) {
        const resena = await resenaRepo.obtenerPorId(idResena);

        if (!resena) {
            throw new Error("Reseña no encontrada");
        }

        return resena;
    }
}

module.exports = new ResenaService();