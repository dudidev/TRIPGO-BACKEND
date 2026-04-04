import pool from "../config/db.js";
import type { Servicio } from "../models/servicioModel.js";

class ServicioRepo {
    static async listar() {
        const [rows] = await pool.query(`SELECT * FROM servicios`);
        return rows;
    }
    static async crear(s: Servicio) {
        const [res] = await pool.query(
            `INSERT INTO servicios (nombre, descripcion, disponibilidad) VALUES (?, ?, ?)`,
            [s.nombre, s.descripcion, s.categoria ? 1 : 0]
        );
        return { insertId: (res as any).insertId };
    }

    static async porEstablecimiento(id: number) {
    const [rows] = await pool.query(`
         SELECT 
                s.id,
                s.nombre,
                s.categoria,
                s.descripcion,
                se.precio
            FROM servicios s
            INNER JOIN servicios_establecimiento se
                ON s.id = se.id_servicio
             WHERE se.id_establecimiento = ?
  `, [id]);

    return rows;
}
}

export default ServicioRepo;