// src/repositories/Tipo.repo.ts
import { pool } from "../config/db";
import { Tipo } from "../models/tipoModel";

export class TipoRepo {
    static async listar() {
        const [rows] = await pool.query(`SELECT * FROM tipos`);
        return rows;
    }
}
