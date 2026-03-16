export interface FiltrosIA {
  tipo?: string
  ubicacion?: string
}

export function interpretarMensaje(mensaje: string): FiltrosIA {

  const texto = mensaje.toLowerCase()

  const filtros: FiltrosIA = {}

    const sinonimos: any = {

    Hotel: [
      "hotel",
      "dormir",
      "hospedar",
      "alojar",
      "alojamiento"
    ],

    Hostal: [
      "hostal",
      "hostel"
    ],

    Glamping: [
      "glamping",
      "camping de lujo"
    ],

    Cabaña: [
      "cabaña",
      "cabana",
      "cabañas"
    ],

    Apartahotel: [
      "apartahotel",
      "apartamento hotel"
    ],

    Ecohotel: [
      "ecohotel",
      "hotel ecologico",
      "hotel ecológico"
    ],

    Restaurante: [
      "comer",
      "restaurante",
      "almorzar",
      "cenar",
      "comida"
    ],

    Bar: [
      "bar",
      "trago",
      "tomar",
      "licor",
      "cerveza"
    ],

    Café: [
      "cafe",
      "café",
      "cafeteria",
      "cafetería"
    ],

    Discoteca: [
      "discoteca",
      "fiesta",
      "bailar",
      "rumba"
    ],

    "Parque temático": [
      "parque",
      "parque tematico",
      "parque temático",
      "atracciones"
    ],

    "Centro recreacional": [
      "recreacion",
      "recreación",
      "centro recreacional",
      "piscina"
    ],

    Museo: [
      "museo",
      "arte",
      "historia"
    ],

    Actividad: [
      "actividad",
      "plan",
      "experiencia"
    ],

    "Tour operador": [
      "tour",
      "guia",
      "guía",
      "tour operador"
    ],

    "Finca turística": [
      "finca",
      "finca turistica",
      "finca turística"
    ],

    Camping: [
      "camping",
      "acampar",
      "campamento"
    ],

    Senderismo: [
      "caminar",
      "senderismo",
      "trekking",
      "caminata"
    ],

    Cabalgatas: [
      "cabalgata",
      "cabalgatas",
      "caballo"
    ],

    Mirador: [
      "mirador",
      "vista",
      "panoramica",
      "panorámica"
    ]

  }


  for (const tipo in sinonimos) {

    if (sinonimos[tipo].some((palabra: string) => texto.includes(palabra))) {
      filtros.tipo = tipo
    }

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
  
    if (texto.includes("la tebaida")) {
    filtros.ubicacion = "La tebaida"
  }

  if (texto.includes("circasia")) {
    filtros.ubicacion = "Circasia"
  }

  if (texto.includes("cordoba")) {
    filtros.ubicacion = "Cordoba"
  }

  if (texto.includes("buenavista")) {
    filtros.ubicacion = "Buenavista"
  }

  if (texto.includes("genova")) {
    filtros.ubicacion = "Genova"
  }

  if (texto.includes("pijao")) {
    filtros.ubicacion = "Pijao"
  }
  
    if (texto.includes("calarca")) {
    filtros.ubicacion = "Calarca"
  }

  if (texto.includes("montenegro")) {
    filtros.ubicacion = "Montenegro"
  }

  if (texto.includes("quimbaya")) {
    filtros.ubicacion = "Quimbaya"
  }

  return filtros
}