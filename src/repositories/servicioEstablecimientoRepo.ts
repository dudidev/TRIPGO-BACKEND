import pool from "../config/db.js";
import type { ServicioEstablecimiento } from "../models/servicioEstablecimiento.js";

class ServicioEstablecimientoRepo {
    static async crear(s: ServicioEstablecimiento) {
        await pool.query(
            `INSERT INTO servicios_establecimiento (id_servicios, id_establecimiento, precio) VALUES (?, ?, ?)`,
            [s.id_servicios, s.id_establecimiento, s.precio]
        );
        return { ok: true };
    }
}
export default ServicioEstablecimientoRepo;