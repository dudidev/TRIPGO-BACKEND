const pool = require("../config/db");
import type { Usuario } from "../models/usuarioModel";

class UsuarioRepo {
    static async crear(usuario: Usuario) {
        const [result] = await pool.query(
            `INSERT INTO usuarios (nombre_usuario, correo_usuario, password_u, rol) VALUES (?, ?, ?, ?)`,
            [usuario.nombre_usuario, usuario.correo_usuario, usuario.password_u, usuario.rol || "usuario"]
        );
        // @ts-ignore
        return { insertId: (result as any).insertId };
    }

    static async findByEmail(correo: string) {
        const [rows] = await pool.query(`SELECT * FROM usuarios WHERE correo_usuario = ?`, [correo]);
        return (rows as any[])[0];
    }

    static async listar() {
        const [rows] = await pool.query(`SELECT id, nombre_usuario, correo_usuario, fecha_registro, rol FROM usuarios`);
        return rows;
    }
}

module.exports = { UsuarioRepo };