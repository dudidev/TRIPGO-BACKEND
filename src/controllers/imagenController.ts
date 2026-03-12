import pool from "../config/db.js";
import { uploadToCloudinary } from "../services/cloudinaryService.js";
import type { Request, Response } from "express";

const subirImagenLugar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const file = (req as any).file;

    if (!file) {
      return res.status(400).json({ message: "No se envió ninguna imagen" });
    }

    const [rows]: any = await pool.query(
      "SELECT id_establecimiento FROM establecimiento WHERE id_establecimiento = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "El establecimiento no existe" });
    }

    const result: any = await uploadToCloudinary(file.buffer, "establecimientos");

    await pool.query(
      "INSERT INTO imagenes_e (id_lugar, url) VALUES (?, ?)",
      [id, result.secure_url]
    );

    res.status(201).json({
      message: "Imagen subida correctamente",
      url: result.secure_url,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const obtenerImagenesLugar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [imagenes]: any = await pool.query(
      "SELECT id_ima, url FROM imagenes_e WHERE id_lugar = ?",
      [id]
    );

    res.json({
      total: imagenes.length,
      imagenes
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las imágenes" });
  }
};


export { subirImagenLugar, obtenerImagenesLugar };