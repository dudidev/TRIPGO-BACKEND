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
        SELECT e.*,
        (SELECT url FROM imagenes_e WHERE id_lugar = e.id_establecimiento LIMIT 1) AS imagen
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

        //  ENDPOINT: /establecimientos/mios (GET) => traer TODOS mis establecimientos
        static async getMios(req: any, res: any) {
            try {
                const userId = req.user.id;

                const [rows] = await pool.query(
                    "SELECT * FROM establecimiento WHERE id_propietario = ?",
                    [userId]
                );

                if (!rows || (rows as any[]).length === 0) {
                    return res.status(404).json({ ok: false, message: "No tienes establecimientos asociados" });
                }

                return res.json({ ok: true, data: rows });
            } catch (err) {
                console.error(err);
                return res.status(500).json({ ok: false, message: "Error al obtener mis establecimientos" });
            }
        };

        //  ENDPOINT: /establecimientos/mios/:id (PUT) => actualizar SOLO 1 establecimiento mío
        static async updateMioById(req: any, res: any) {
            try {
                const userId = req.user.id;
                const idEstablecimiento = Number(req.params.id);
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

                const [result] = await pool.query(
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
        WHERE id_propietario = ? AND id_establecimiento = ?`,
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
                        userId,
                        idEstablecimiento
                    ]
                );

                // @ts-ignore (depende del driver, pero normalmente viene affectedRows)
                if (!result || result.affectedRows === 0) {
                    return res.status(404).json({
                        ok: false,
                        message: "No se encontró el establecimiento o no te pertenece"
                    });
                }

                return res.json({ ok: true, message: "Establecimiento actualizado correctamente" });
            } catch (err) {
                console.error(err);
                return res.status(500).json({ ok: false, message: "Error al actualizar el establecimiento" });
            }
        };
    }
    module.exports = { EstablecimientoRepo };