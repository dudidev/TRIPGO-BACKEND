export interface FiltrosIA {
  tipo?: string
  ubicacion?: string
}

export function interpretarMensaje(mensaje: string): FiltrosIA {

  const texto = mensaje.toLowerCase()

  const filtros: FiltrosIA = {}

  if (texto.includes("caminar") || texto.includes("senderismo")) {
    filtros.tipo = "senderismo"
  }

  if (texto.includes("comer") || texto.includes("restaurante")) {
    filtros.tipo = "restaurante"
  }

  if (texto.includes("cafe") || texto.includes("café")) {
    filtros.tipo = "cafe"
  }

  if (texto.includes("bar") || texto.includes("tomar")) {
    filtros.tipo = "bar"
  }

  if (texto.includes("mirador")) {
    filtros.tipo = "mirador"
  }

 
  if (texto.includes("armenia")) {
    filtros.ubicacion = "Armenia"
  }

  if (texto.includes("salento")) {
    filtros.ubicacion = "Salento"
  }

  if (texto.includes("filandia")) {
    filtros.ubicacion = "Filandia"
  }

  return filtros
}