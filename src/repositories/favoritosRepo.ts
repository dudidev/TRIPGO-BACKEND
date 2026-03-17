import pool from "../config/db.js";

export const insertarFavorito = async (id_usuario: number, id_establecimiento: number) => {

  const [result]: any = await pool.query(
    `INSERT INTO favoritos (id_usuario, id_establecimiento)
     VALUES (?, ?)`,
    [id_usuario, id_establecimiento]
  );

  return result;
};

export const borrarFavorito = async (id_usuario: number, id_establecimiento: number) => {

  const [result]: any = await pool.query(
    `DELETE FROM favoritos 
     WHERE id_usuario = ? AND id_establecimiento = ?`,
    [id_usuario, id_establecimiento]
  );

  return result;
};

export const listarFavoritos = async (id_usuario: number) => {

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

  return rows;
};