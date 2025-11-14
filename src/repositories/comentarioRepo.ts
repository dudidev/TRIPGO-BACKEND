// src/repositories/Comentario.repo.ts
import { pool } from "../config/db";
import { Comentario } from "../models/comentarioModel";

export class ComentarioRepo {
    static async crear(c: Comentario) {
        const [res] = await pool.query(
            `INSERT INTO comentarios (comentario, id_usuario, id_ubicacion, id_establecimiento) VALUES (?, ?, ?, ?)`,
            [c.comentario, c.id_usuario, c.id_ubicacion, c.id_establecimiento || null]
        );
        // @ts-ignore
        return { insertId: (res as any).insertId };
    }
    static async listarPorUbicacion(id_ubicacion: number) {
        const [rows] = await pool.query(`SELECT * FROM comentarios WHERE id_ubicacion = ?`, [id_ubicacion]);
        return rows;
    }
}
