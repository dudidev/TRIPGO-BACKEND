import { interpretarMensaje } from "../utils/chatbotIA.js"
import { buscarLugares } from "../repositories/iaRepo.js"

export const chatbotIAService = async (mensaje: string) => {

  const resultadoIA = interpretarMensaje(mensaje)

  if (resultadoIA.esConversacion) {
    return {
      tipo: "mensaje",
      mensaje: resultadoIA.mensaje
    }
  }

  const lugares = await buscarLugares(
    resultadoIA.filtros?.tipo,
    resultadoIA.filtros?.ubicacion
  )

  if (!lugares.length) {
    return {
      tipo: "mensaje",
      mensaje: "No encontré resultados para esa búsqueda 😕 Intenta con otra ubicación o tipo de lugar."
    }
  }

  return {
    tipo: "resultados",
    data: lugares
  }
}
