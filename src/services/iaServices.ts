import { interpretarMensaje } from "../utils/chatbotIA.js"
import { buscarLugares } from "../repositories/iaRepo.js"

export const chatbotIAService = async (mensaje: string) => {

  const filtros = interpretarMensaje(mensaje)

  const lugares = await buscarLugares(
    filtros.tipo,
    filtros.ubicacion
  )

  return lugares
}
