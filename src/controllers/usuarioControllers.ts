// src/controllers/Usuario.controller.ts
import type { Request, Response } from "express";
const { UsuarioService } = require("../services/usuarioService");

class UsuarioController {
    static async crear(req: Request, res: Response) {
        try {
            const result = await UsuarioService.crear(req.body);
            res.status(201).json({ ok: true, result });
        } catch (err: any) {
            res.status(500).json({ ok: false, message: err.message || err });
        }
    }

    static async listar(req: Request, res: Response) {
        try {
            const rows = await UsuarioService.listar();
            res.json({ ok: true, data: rows });
        } catch (err: any) {
            res.status(500).json({ ok: false, message: err.message });
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const { correo_usuario, password_u } = req.body;
            const data = await UsuarioService.login(correo_usuario, password_u);
            res.json({ ok: true, ...data });
        } catch (err: any) {
            res.status(401).json({ ok: false, message: err.message });
        }
    }

    static async obtener(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const usuario = await UsuarioService.obtenerPorId(id);
        res.json({ ok: true, data: usuario });
    } catch (err: any) {
        res.status(404).json({ ok: false, message: err.message });
        }
    }

    static async actualizar(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const result = await UsuarioService.actualizar(id, req.body);
            res.json({ ok: true, result });
        } catch (err: any) {
            res.status(500).json({ ok: false, message: err.message });
        }
    }
    

    static async eliminar(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const result = await UsuarioService.eliminar(id);
            res.json({ ok: true, result });
        } catch (err: any) {
            res.status(500).json({ ok: false, message: err.message });
        }
    }
}

module.exports = { UsuarioController };