import { pool } from "../config/db";
import { ServicioEstablecimiento } from "../models/servicioEstablecimiento";

export class ServicioEstablecimientoRepo {
    static async crear(s: ServicioEstablecimiento) {
        await pool.query(
            `INSERT INTO servicios_establecimiento (id_servicios, id_establecimiento, precio) VALUES (?, ?, ?)`,
            [s.id_servicios, s.id_establecimiento, s.precio]
        );
        return { ok: true };
    }
}
