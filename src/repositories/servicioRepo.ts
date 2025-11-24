const { pool } = require("../config/db");
import type { Servicio } from "../models/servicioModel";

class ServicioRepo {
    static async listar() {
        const [rows] = await pool.query(`SELECT * FROM servicios`);
        return rows;
    }
    static async crear(s: Servicio) {
        const [res] = await pool.query(
            `INSERT INTO servicios (nombre_servicio, descripcion, disponibilidad) VALUES (?, ?, ?)`,
            [s.nombre_servicio, s.descripcion, s.disponibilidad ? 1 : 0]
        );
        // @ts-ignore
        return { insertId: (res as any).insertId };
    }
}

module.exports = { ServicioRepo };