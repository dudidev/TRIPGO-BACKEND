import { Request, Response } from "express";
import pool from "../config/db.js";


export const agregarFavorito = async (req: Request, res: Response): Promise<void> => {
  try {

    const { id_usuario, id_establecimiento } = req.body;

    const [result]: any = await pool.query(
      `INSERT INTO favoritos (id_usuario, id_establecimiento)
       VALUES (?, ?)`,
      [id_usuario, id_establecimiento]
    );

    res.json({
      message: "Favorito agregado",
      id_favorito: result.insertId
    });

  } catch (error: any) {

    if (error.code === "ER_DUP_ENTRY") {
      res.status(400).json({
        message: "Este establecimiento ya está en favoritos"
      });
      return;
    }

    res.status(500).json(error);
  }
};


export const eliminarFavorito = async (req: Request, res: Response): Promise<void> => {
  try {

    const { id_usuario, id_establecimiento } = req.params;

    const [result]: any = await pool.query(
      `DELETE FROM favoritos 
       WHERE id_usuario = ? AND id_establecimiento = ?`,
      [id_usuario, id_establecimiento]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({
        message: "Favorito no encontrado"
      });
      return;
    }

    res.json({
      message: "Favorito eliminado"
    });

  } catch (error) {
    res.status(500).json(error);
  }
};

export const obtenerFavoritos = async (req: Request, res: Response): Promise<void> => {
  try {

    const { id_usuario } = req.params;

    const [rows] = await pool.query(
      `SELECT 
        f.id_favorito,
        e.id_establecimiento,
        e.nombre_establecimiento,
        e.descripcion,
        e.direccion,
        e.latitud,
        e.longitud
      FROM favoritos f
      JOIN establecimiento e 
      ON f.id_establecimiento = e.id_establecimiento
      WHERE f.id_usuario = ?`,
      [id_usuario]
    );

    res.json(rows);

  } catch (error) {
    res.status(500).json(error);
  }
};