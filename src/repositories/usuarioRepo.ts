import pool from "../config/db.js";
import type { Usuario } from "../models/usuarioModel.js";

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
        const [rows] = await pool.query(`SELECT * FROM usuarios`);
        return rows;
    }

    static async findById(id: number) {
        const [rows] = await pool.query(
            `SELECT id, nombre_usuario, correo_usuario, fecha_registro, rol, foto_perfil, foto_public_id
    FROM usuarios
    WHERE id = ?`,
            [id]
        );

        return (rows as any[])[0];
    }

    static async actualizar(id: number, usuario: any) {
        const fields: string[] = [];
        const values: any[] = [];

        if (usuario.nombre_usuario !== undefined) {
            fields.push("nombre_usuario = ?");
            values.push(usuario.nombre_usuario);
        }

        if (usuario.correo_usuario !== undefined) {
            fields.push("correo_usuario = ?");
            values.push(usuario.correo_usuario);
        }

        if (usuario.password_u !== undefined) {
            fields.push("password_u = ?");
            values.push(usuario.password_u);
        }

        if (usuario.foto_perfil !== undefined) {
            fields.push("foto_perfil = ?");
            values.push(usuario.foto_perfil);
        }

        if (usuario.foto_public_id !== undefined) {
            fields.push("foto_public_id = ?");
            values.push(usuario.foto_public_id);
        }

        if (fields.length === 0) {
            throw new Error("No hay campos para actualizar");
        }

        const sql = `
        UPDATE usuarios 
        SET ${fields.join(", ")} 
        WHERE id = ?
    `;

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

export default UsuarioRepo;