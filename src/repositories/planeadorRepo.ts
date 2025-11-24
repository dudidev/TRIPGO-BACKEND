const { pool } = require("../config/db");
import type { Planeador } from "../models/planeadorModel";

class PlaneadorRepo {
    static async crear(p: Planeador) {
        const [res] = await pool.query(`INSERT INTO planeador (nombre_plan, id_usuario, total_estimado) VALUES (?, ?, ?)`, [p.nombre_plan, p.id_usuario, p.total_estimado || 0]);
        // @ts-ignore
        return { insertId: (res as any).insertId };
    }
}
module.exports = { PlaneadorRepo };