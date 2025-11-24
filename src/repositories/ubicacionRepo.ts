
const { pool } = require("../config/db");
import type{ Ubicacion } from "../models/ubicacionModel";

class UbicacionRepo {
    static async listar() {
        const [rows] = await pool.query(`SELECT * FROM ubicaciones`);
        return rows;
    }
    static async crear(u: Ubicacion) {
        const [res] = await pool.query(
            `INSERT INTO ubicaciones (nombre_ciudad, departamento, descripcion) VALUES (?, ?, ?)`,
            [u.nombre_ciudad, u.departamento, u.descripcion]
        );
        // @ts-ignore
        return { insertId: (res as any).insertId };
    }
}

module.exports = { UbicacionRepo };