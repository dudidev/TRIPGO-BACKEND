const pool  = require("../config/db");
import type { ServicioEstablecimiento } from "../models/servicioEstablecimiento";

class ServicioEstablecimientoRepo {
    static async crear(s: ServicioEstablecimiento) {
        await pool.query(
            `INSERT INTO servicios_establecimiento (id_servicios, id_establecimiento, precio) VALUES (?, ?, ?)`,
            [s.id_servicios, s.id_establecimiento, s.precio]
        );
        return { ok: true };
    }
}
module.exports = { ServicioEstablecimientoRepo };