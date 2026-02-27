import type { Request, Response } from "express";
const { EstablecimientoService } = require("../services/establecimientoService");
const pool = require("../config/db");

class EstablecimientoController {
  static async listar(req: Request, res: Response) {
    const rows = await EstablecimientoService.listar();
    res.json({ ok: true, data: rows });
  }

  static async crear(req: Request, res: Response) {
    const r = await EstablecimientoService.crear(req.body);
    res.status(201).json({ ok: true, data: r });
  }

  static async listarPorUbicacionYTipo(req, res) {
  const { town, idTipo } = req.params;
  const rows = await EstablecimientoService.listarPorUbicacionYTipo(town, Number(idTipo));
  res.json({ ok: true, data: rows });
}
}

//  ENDPOINT: /establecimientos/mio (GET)
const getMio = async (req: any, res: any) => {
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

//  ENDPOINT: /establecimientos/mio (PUT)
const updateMio = async (req: any, res: any) => {
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
  };

  



};

  //  ENDPOINT: /establecimientos/mios (GET) => traer TODOS mis establecimientos
const getMios = async (req: any, res: any) => {
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
const updateMioById = async (req: any, res: any) => {
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


// ✅ SOLO UN EXPORT
module.exports = {
  EstablecimientoController,
  getMio,
  updateMio,
  getMios,
  updateMioById
};
