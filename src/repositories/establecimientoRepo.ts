// src/repositories/Establecimiento.repo.ts
const pool = require("../config/db");
import type { Establecimiento } from "../models/establecimientoModel";

class EstablecimientoRepo {
    static async listar() {
        const [rows] = await pool.query(`SELECT * FROM establecimiento`);
        return rows;
    }

    static async listarPorUbicacionYTipo(town: string, idTipo: number) {
        const sql = `
    SELECT e.*
    FROM establecimiento e
    WHERE LOWER(e.ubicacion) = LOWER(?)
      AND e.tipo = ?
  `;
        const [rows] = await pool.query(sql, [town, idTipo]);
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

    // ✅ ENDPOINT: /establecimientos/mio (GET)
    static async getMio(req: any, res: any) {
        try {
            const userId = req.user.id;

            const [rows] = await pool.query(
                "SELECT * FROM establecimiento WHERE id_propietario = ? LIMIT 1",
                [userId]
            );

            if (!rows || rows.length === 0) {
                return res.status(404).json({ message: "No tienes establecimiento asociado" });
            }

            return res.json(rows[0]);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Error al obtener mi establecimiento" });
        }
    };

    // ✅ ENDPOINT: /establecimientos/mio (PUT)
    static async updateMio(req: any, res: any) {
        try {
            const userId = req.user.id;
            const payload = req.body;

            const {
                nombre_establecimiento,
                direccion,
                ubicacion,
                horario_apertura,
                horario_cierre,
                estado,
                descripcion,
                telefono,
                correo,
                tipo
            } = payload;

            await pool.query(
                `UPDATE establecimiento
       SET nombre_establecimiento = ?,
           direccion = ?,
           ubicacion = ?,
           horario_apertura = ?,
           horario_cierre = ?,
           estado = ?,
           descripcion = ?,
           telefono = ?,
           correo = ?,
           tipo = ?
       WHERE id_propietario = ?`,
                [
                    nombre_establecimiento,
                    direccion,
                    ubicacion,
                    horario_apertura,
                    horario_cierre,
                    estado,
                    descripcion,
                    telefono,
                    correo,
                    tipo,
                    userId
                ]
            );

            return res.json({ message: "Establecimiento actualizado correctamente" });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Error al actualizar mi establecimiento" });
        }
    };

}
module.exports = { EstablecimientoRepo };