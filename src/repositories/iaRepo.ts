import db from "../config/db"

export const buscarLugares = async (tipo?: string, ubicacion?: string) => {

  let query = `
  SELECT e.*, t.nombre_tipo
  FROM establecimiento e
  JOIN tipos t ON e.tipo = t.id_tipo
  WHERE e.estado = 'activo'
  `

  const params: any[] = []

  if (tipo) {
    query += " AND t.nombre_tipo = ?"
    params.push(tipo)
  }

  if (ubicacion) {
    query += " AND e.ubicacion LIKE ?"
    params.push(`%${ubicacion}%`)
  }

  const [rows]: any = await db.query(query, params)

  return rows
}