import { Request, Response } from "express";
import pool from "../config/db.js";
import bcrypt from "bcrypt";
import UsuarioService from '../services/usuarioService.js';
import { verifyGoogleToken } from '../services/googleService.js';
import { signToken } from "../utils/jwt.js";
import { sendUserWelcomeEmail } from "../services/emailService.js";

const register = async (req: Request, res: Response) => {
    try {
        const { nombre_usuario, correo_usuario, password_u, rol } = req.body;

        // Validar campos requeridos
        if (!nombre_usuario || !correo_usuario || !password_u) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        // Verificar si el usuario ya existe
        const [existing]: any = await pool.execute(
            "SELECT * FROM usuarios WHERE correo_usuario = ?",
            [correo_usuario]
        );

        if (existing.length > 0) {
            return res.status(400).json({ message: "El correo ya está registrado" });
        }

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password_u, 10);

        // Intentar enviar el email de bienvenida
        try {
            await sendUserWelcomeEmail(correo_usuario, nombre_usuario);
        } catch (e) {
            console.error("❌ Error al enviar email de bienvenida");
        }

        // SOLO SI EL EMAIL SE ENVIÓ: Insertar nuevo usuario
        await pool.query(
            "INSERT INTO usuarios (nombre_usuario, correo_usuario, password_u, rol) VALUES (?, ?, ?, ?)",
            [nombre_usuario, correo_usuario, hashedPassword, rol || "usuario"]
        );

        res.status(201).json({
            message: "Usuario registrado exitosamente. Revisa tu correo para comenzar."
        });

    } catch (error) {
        console.error("❌ Error en registro:", error);
        res.status(500).json({ message: "Error al registrar usuario" });
    }
};

const login = async (req: Request, res: Response) => {
    try {
        const { correo_usuario, password_u } = req.body;

        if (!correo_usuario || !password_u) {
            return res.status(400).json({ message: "Correo y contraseña son obligatorios" });
        }

        // Buscar usuario
        const [rows]: any = await pool.query(
            "SELECT * FROM usuarios WHERE correo_usuario = ?",
            [correo_usuario]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const user = rows[0];

        // Verificar contraseña
        const validPassword = await bcrypt.compare(password_u, user.password_u);
        if (!validPassword) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        const token = signToken({
            id: user.id,
            rol: user.rol
        });

        const isProd = process.env.NODE_ENV === "production";

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/"
        });

        res.json({
            message: "Inicio de sesión exitoso",
            usuario: {
                id: user.id,
                nombre_usuario: user.nombre_usuario,
                correo_usuario: user.correo_usuario,
                rol: user.rol,
            },
        });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el inicio de sesión" });
    }
};

const logout = async (_req: Request, res: Response) => {
    const isProd = process.env.NODE_ENV === "production";

    res.clearCookie("auth_token", {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        path: "/"
    });

    res.json({ message: "Sesión cerrada correctamente" });
};

const me = async (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ mensaje: 'No autenticado' });
    }

    const usuario = await UsuarioService.obtenerPorId(req.user.id);

    return res.json({ user: usuario });
};

// ----------- Google Sign ---------
export const googleLogin = async (req: Request, res: Response) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ mensaje: 'Token requerido' });
        }

        const data = await verifyGoogleToken(token);

        if (!data.email || !data.nombre || !data.googleId) {
            return res.status(400).json({ mensaje: 'Datos de Google incompletos' });
        }

        let usuario = await UsuarioService.obtenerPorEmail(data.email);

        if (!usuario) {
            const result = await UsuarioService.crear({
                nombre_usuario: data.nombre,
                correo_usuario: data.email,
                password_u: null,
                google_id: data.googleId,
                auth_provider: 'google'
            });

            usuario = await UsuarioService.obtenerPorId(result.insertId);
        }

        const jwt = signToken({
            id: usuario.id,
            rol: usuario.rol
        });

        const isProd = process.env.NODE_ENV === "production";

        res.cookie("auth_token", jwt, {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/"
        });

        return res.json({
            usuario,
            mensaje: 'Login con Google OK'
        });

    } catch (error) {
        console.error(error);
        return res.status(401).json({ mensaje: 'Error en login con Google' });
    }
};
export { register, login, logout, me };