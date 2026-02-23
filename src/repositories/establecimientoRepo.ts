// src/repositories/Establecimiento.repo.ts
const pool = require("../config/db");
import type { Establecimiento } from "../models/establecimientoModel";

class EstablecimientoRepo {
    static async listar() {
        const [rows] = await pool.query(`SELECT * FROM establecimiento`);
        return rows;
    }

    static async listarPorTownYCategory(town: string, category: string) {
    const sql = `
      SELECT e.*, t.nombre_tipo
      FROM establecimiento e
      JOIN tipos t ON e.tipo = t.id_tipo
      WHERE LOWER(e.ubicacion) = LOWER(?)
        AND LOWER(t.nombre_tipo) = LOWER(?)
    `;

    const [rows] = await pool.query(sql, [town, category]);
    return rows;
  }
  
    static async crear(e: Establecimiento) {
        const [res] = await pool.query(
            `INSERT INTO establecimiento (nombre_establecimiento, direccion, ubicacion, horario_apertura, horario_cierre, estado, descripcion, id_propietario, telefono, correo, tipo)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [e.nombre_establecimiento, e.direccion, e.ubicacion, e.horario_apertura, e.horario_cierre, e.estado || "activo", e.descripcion, e.id_propietario, e.telefono, e.correo, e.tipo]
        );
        // @ts-ignore
        return { insertId: (res as any).insertId };
    }



    
}
module.exports = { EstablecimientoRepo };