import pool from "../config/db.js";
import { DetallePlaneador } from "../models/detallePlaneadorModel.js";

class DetallePlaneadorRepo {

    
    static async buscar(d: DetallePlaneador) {
        const [rows]: any = await pool.query(
            `SELECT * FROM detalles_planeador 
             WHERE id_planeador = ? 
             AND id_servicio = ? 
             AND id_establecimiento = ?`,
            [d.id_planeador, d.id_servicio, d.id_establecimiento]
        );

        return rows[0];
    }

    
    static async crear(d: DetallePlaneador) {
        const [res]: any = await pool.query(
            `INSERT INTO detalles_planeador 
            (id_planeador, id_establecimiento, id_servicio, cantidad, precio_unitario) 
            VALUES (?, ?, ?, ?, ?)`,
            [
                d.id_planeador,
                d.id_establecimiento,
                d.id_servicio,
                d.cantidad || 1,
                d.precio_unitario || 0
            ]
        );

        return { insertId: res.insertId };
    }

    static async actualizarCantidad(id: number, cantidad: number) {
        await pool.query(
            `UPDATE detalles_planeador 
             SET cantidad = ? 
             WHERE id = ?`,
            [cantidad, id]
        );

        return { id, cantidad };
    }
}

export default DetallePlaneadorRepo;