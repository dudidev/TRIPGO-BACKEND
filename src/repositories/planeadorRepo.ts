import pool from "../config/db.js";
import type { Planeador } from "../models/planeadorModel.js";

class PlaneadorRepo {
    static async crear(p: Planeador) {
        const [res] = await pool.query(`INSERT INTO planeador (nombre_plan, id_usuario, total_estimado) VALUES (?, ?, ?)`, [p.nombre_plan, p.id_usuario, p.total_estimado || 0]);
        // @ts-ignore
        return { insertId: (res as any).insertId };
    }

    static async obtenerDetalle(idPlaneador: number) {
    const [rows] = await pool.query(`
        SELECT 
            dp.id,
            dp.id_planeador,
            dp.cantidad,

            e.id_establecimiento,
            e.nombre_establecimiento,

            s.id AS id_servicio,
            s.nombre,

            se.precio

        FROM detalles_planeador dp

        JOIN establecimiento e 
            ON e.id_establecimiento = dp.id_establecimiento

        JOIN servicios s 
            ON s.id = dp.id_servicio

        JOIN servicios_establecimiento se 
            ON se.id_servicio = dp.id_servicio
            AND se.id_establecimiento = dp.id_establecimiento

        WHERE dp.id_planeador = ?
    `, [idPlaneador]);

    return rows;
}
}
export default PlaneadorRepo;