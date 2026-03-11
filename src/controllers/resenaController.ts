import type { Request, Response } from "express";
const resenaService = require("../services/resenaService");

class ResenaController {
    async crear(req: Request, res: Response) {
        try {
            const idUsuario = (req as any).user.id;
            const { id_establecimiento, calificacion, comentario } = req.body;

            const resena = await resenaService.crear(idUsuario, {
                id_establecimiento,
                calificacion,
                comentario
            });

            res.status(201).json({
                message: "Reseña publicada exitosamente",
                resena
            });
        } catch (error) {
            console.error("Error al crear reseña:", error);
            const errorMessage = error instanceof Error ? error.message : "Error al crear reseña";
            res.status(400).json({ message: errorMessage });
        }
    }

    async listarPorEstablecimiento(req: Request, res: Response) {
        try {
            const idEstablecimiento = parseInt(req.params.id);
            const idUsuarioLogueado = (req as any).user?.id; // Opcional, puede no estar logueado

            const datos = await resenaService.listarPorEstablecimiento(idEstablecimiento, idUsuarioLogueado);

            res.json(datos);
        } catch (error) {
            console.error("Error al listar reseñas:", error);
            res.status(500).json({ message: "Error al listar reseñas" });
        }
    }

    async listarMisResenas(req: Request, res: Response) {
        try {
            const idUsuario = (req as any).user.id;

            const resenas = await resenaService.listarMisResenas(idUsuario);

            res.json(resenas);
        } catch (error) {
            console.error("Error al listar mis reseñas:", error);
            res.status(500).json({ message: "Error al listar reseñas" });
        }
    }

    async obtenerPorId(req: Request, res: Response) {
        try {
            const idResena = parseInt(req.params.id);

            const resena = await resenaService.obtenerPorId(idResena);

            res.json(resena);
        } catch (error) {
            console.error("Error al obtener reseña:", error);
            const errorMessage = error instanceof Error ? error.message : "Error al obtener reseña";
            res.status(404).json({ message: errorMessage });
        }
    }

    async actualizar(req: Request, res: Response) {
        try {
            const idResena = parseInt(req.params.id);
            const idUsuario = (req as any).user.id;
            const { calificacion, comentario } = req.body;

            const resena = await resenaService.actualizar(idResena, idUsuario, {
                calificacion,
                comentario
            });

            res.json({
                message: "Reseña actualizada exitosamente",
                resena
            });
        } catch (error) {
            console.error("Error al actualizar reseña:", error);
            const errorMessage = error instanceof Error ? error.message : "Error al actualizar reseña";
            res.status(400).json({ message: errorMessage });
        }
    }

    async eliminar(req: Request, res: Response) {
        try {
            const idResena = parseInt(req.params.id);
            const idUsuario = (req as any).user.id;

            await resenaService.eliminar(idResena, idUsuario);

            res.json({ message: "Reseña eliminada exitosamente" });
        } catch (error) {
            console.error("Error al eliminar reseña:", error);
            const errorMessage = error instanceof Error ? error.message : "Error al eliminar reseña";
            res.status(400).json({ message: errorMessage });
        }
    }
}

module.exports = new ResenaController();