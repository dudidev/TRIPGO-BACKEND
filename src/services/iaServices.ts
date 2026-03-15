import { interpretarMensaje } from "../utils/chatbotIA"
import { calcularScore } from "../utils/recomendadorIA"
import { buscarLugares } from "../repositories/iaRepo"

export const chatbotIAService = async (mensaje: string) => {

  const filtros = interpretarMensaje(mensaje)

  const lugares = await buscarLugares(
    filtros.tipo,
    filtros.ubicacion
  )

  return lugares
}



export const recomendacionesIAService = async (
  ubicacion?: string,
  tipo?: string
) => {

  const lugares = await buscarLugares(tipo, ubicacion)

  const resultados = lugares.map((lugar: any) => ({
    ...lugar,
    score: calcularScore(lugar)
  }))

  resultados.sort((a: any, b: any) => b.score - a.score)

  return resultados.slice(0, 10)
}