
const pool = require("../config/db");
import type { DetallePlaneador } from "../models/detallePlaneadorModel";

class DetallePlaneadorRepo {
    static async crear(d: DetallePlaneador) {
        const [res] = await pool.query(`INSERT INTO detalles_planeador (id_plan, id_establecimiento, id_servicio, cantidad, precio_unitario) VALUES (?, ?, ?, ?, ?)`, [d.id_plan, d.id_establecimiento, d.id_servicio, d.cantidad || 1, d.precio_unitario || 0]);
        // @ts-ignore
        return { insertId: (res as any).insertId };
    }
}
module.exports = { DetallePlaneadorRepo };