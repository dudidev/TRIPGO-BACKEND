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
    const [rows] = await pool.query(
         `SELECT id, nombre_usuario, correo_usuario, password_u, rol, foto_perfil 
            FROM usuarios 
            WHERE correo_usuario = ?`,
     [correo]
    );
  return (rows as any[])[0];
}

    static async listar() {
        const [rows] = await pool.query(`SELECT id, nombre_usuario, correo_usuario, fecha_registro, rol FROM usuarios`);
        return rows;
    }

    static async findById(id: number) {
        const [rows] = await pool.query(
            `SELECT id, nombre_usuario, correo_usuario, fecha_registro, rol , foto_perfil
            FROM usuarios WHERE id = ?`,
            [id]
        );
        return (rows as any[])[0];
    }

   static async actualizar(id: number, usuario: any) {
        const fields: string[] = [];
        const values: any[] = [];

        
        if (usuario.nombre_usuario) {
            fields.push("nombre_usuario = ?");
            values.push(usuario.nombre_usuario);
        }

        if (usuario.correo_usuario) {
            fields.push("correo_usuario = ?");
            values.push(usuario.correo_usuario);
        }

        if (usuario.password_u) {
            fields.push("password_u = ?");
            values.push(usuario.password_u);
        }

        const sql = `UPDATE usuarios SET ${fields.join(", ")} WHERE id = ?`;
        values.push(id);

        const [result] = await pool.query(sql, values);
        return result;
    }

    static async eliminar(id: number) {
        const [result] = await pool.query(
            `DELETE FROM usuarios WHERE id = ?`,
            [id]
        );

        return result;
    }

    static async findByIdWithPassword(id: number) {
    const [rows] = await pool.query(
        `SELECT id, password_u FROM usuarios WHERE id = ?`,
        [id]
    );

    return (rows as any[])[0];
}
}

module.exports = { UsuarioRepo };