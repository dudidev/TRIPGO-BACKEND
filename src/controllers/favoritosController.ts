import { Request, Response } from "express";
import {
  insertarFavorito,
  borrarFavorito,
  listarFavoritos
} from "../repositories/favoritosRepo.js";


export const agregarFavorito = async (req: Request, res: Response): Promise<void> => {
  try {

    const { id_usuario, id_establecimiento } = req.body;

    const result: any = await insertarFavorito(id_usuario, id_establecimiento);

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

    const result: any = await borrarFavorito(
      Number(id_usuario),
      Number(id_establecimiento)
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

    const rows = await listarFavoritos(Number(id_usuario));

    res.json(rows);

  } catch (error) {
    res.status(500).json(error);
  }
};