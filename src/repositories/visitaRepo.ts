const pool = require("../config/db");
import type { Visita } from "../models/visitaModel";

class VisitaRepo {
    static async crear(v: Visita) {
        const [res] = await pool.query(`INSERT INTO visitas (fecha_inicio, id_usuario, id_establecimiento) VALUES (?, ?, ?)`, [v.fecha_inicio || new Date(), v.id_usuario, v.id_establecimiento]);
        // @ts-ignore
        return { insertId: (res as any).insertId };
    }
}
module.exports = { VisitaRepo };
