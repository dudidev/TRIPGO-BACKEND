import type { Request, Response } from "express";
import recomendacionService from "../services/recomendacionService.js";

class RecomendacionController {

    // ========== REGISTRAR VISUALIZACIÓN ==========

    async registrarVisualizacion(req: Request, res: Response) {
        try {
            const idUsuario = (req as any).user.id;
            const { id_establecimiento, tiempo_visualizacion } = req.body;

            if (!id_establecimiento) {
                return res.status(400).json({
                    message: "El ID del establecimiento es requerido"
                });
            }

            await recomendacionService.registrarVisualizacion(
                idUsuario,
                id_establecimiento,
                tiempo_visualizacion || 0
            );

            res.status(201).json({
                message: "Visualización registrada"
            });

        } catch (error) {
            console.error("Error registrando visualización:", error);
            const errorMessage = error instanceof Error ? error.message : "Error al registrar visualización";
            res.status(500).json({ message: errorMessage });
        }
    }

    // ========== OBTENER RECOMENDACIONES PERSONALIZADAS ==========

    async obtenerRecomendaciones(req: Request, res: Response) {
        try {
            const idUsuario = (req as any).user.id;
            const limite = parseInt(req.query.limite as string) || 10;

            const recomendaciones = await recomendacionService.generarRecomendaciones(
                idUsuario,
                limite
            );

            res.json({
                total: recomendaciones.length,
                recomendaciones
            });

        } catch (error) {
            console.error("Error obteniendo recomendaciones:", error);
            res.status(500).json({
                message: "Error al obtener recomendaciones"
            });
        }
    }

    // ========== OBTENER PERFIL DEL USUARIO ==========

    async obtenerPerfil(req: Request, res: Response) {
        try {
            const idUsuario = (req as any).user.id;

            const perfil = await recomendacionService.obtenerPerfilGuardado(idUsuario);

            res.json(perfil);

        } catch (error) {
            console.error("Error obteniendo perfil:", error);
            res.status(500).json({
                message: "Error al obtener perfil"
            });
        }
    }

    // ========== REFRESCAR PERFIL (RECALCULAR) ==========

    async refrescarPerfil(req: Request, res: Response) {
        try {
            const idUsuario = (req as any).user.id;

            const perfil = await recomendacionService.construirPerfilUsuario(idUsuario);

            res.json({
                message: "Perfil actualizado exitosamente",
                perfil
            });

        } catch (error) {
            console.error("Error refrescando perfil:", error);
            res.status(500).json({
                message: "Error al refrescar perfil"
            });
        }
    }
}

export default new RecomendacionController();