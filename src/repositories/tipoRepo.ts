const pool = require("../config/db");
import type { Tipo } from "../models/tipoModel";

class TipoRepo {
    static async listar() {
        const [rows] = await pool.query(`SELECT * FROM tipos`);
        return rows;
    }

    static async listarPorUbicacion(town: string) {
    const sql = `
      SELECT DISTINCT t.id_tipo, t.nombre_tipo
      FROM establecimiento e
      JOIN tipos t ON e.tipo = t.id_tipo
      WHERE LOWER(e.ubicacion) = LOWER(?)
      ORDER BY t.nombre_tipo
    `;
    const [rows] = await pool.query(sql, [town]);
    return rows;
  }
    static async crear(t: Tipo) {
        const [res] = await pool.query(
            `INSERT INTO tipos (nombre_tipo) VALUES (?)`,
            [t.nombre_tipo ? 1 : 0]
        );
        return { insertId: (res as any).insertId };
    }
}
module.exports = { TipoRepo };