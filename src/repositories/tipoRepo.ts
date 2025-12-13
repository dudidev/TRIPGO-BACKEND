const pool = require("../config/db");
import type { Tipo } from "../models/tipoModel";

class TipoRepo {
    static async listar() {
        const [rows] = await pool.query(`SELECT * FROM tipos`);
        return rows;
    }
}

module.exports = { TipoRepo };
