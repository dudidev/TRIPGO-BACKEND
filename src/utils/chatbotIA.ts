export interface RespuestaIA {
  filtros?: {
    tipo?: string
    ubicacion?: string
  }
  mensaje?: string
  esConversacion?: boolean
}

export function interpretarMensaje(mensaje: string): RespuestaIA {

  const texto = mensaje.toLowerCase().trim()

  //Logica saludos y despedidas
  const saludos = [
    "hola",
    "buenas",
    "buenos dias",
    "buen día",
    "hey",
    "holi",
    "ola",
    "hello",
    "hi"
  ]

  const despedidas = [
    "adios",
    "adiós",
    "chao",
    "nos vemos",
    "hasta luego"
  ]

  const agradecimientos = [
    "gracias",
    "muchas gracias",
    "thanks"
  ]

  if (saludos.some(p => texto.includes(p))) {
    return {
      esConversacion: true,
      mensaje: "¡Hola! 👋 Soy TritanIA, tu asistente de TripGO. Puedes escribirme cosas como: 'quiero caminar en Salento', 'un hotel en Armenia' o 'dónde comer en Filandia'."
    }
  }

  if (despedidas.some(p => texto.includes(p))) {
    return {
      esConversacion: true,
      mensaje: "¡Hasta luego! 👋 Espero haberte ayudado a encontrar un buen plan."
    }
  }

  if (agradecimientos.some(p => texto.includes(p))) {
    return {
      esConversacion: true,
      mensaje: "¡Con gusto! 😊 Si quieres, también puedo ayudarte a encontrar hoteles, restaurantes, senderismo, cafés y más."
    }
  }


  //Filtrado de categorias y sinonimos
  const filtros: any = {}

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

  if (!filtros.tipo && !filtros.ubicacion) {
    return {
      esConversacion: true,
      mensaje: "Lo siento, no entendí tu consulta 😅 Prueba escribiendo algo como: 'hotel en Armenia', 'quiero caminar en Salento' o 'dónde comer en Filandia'."
    }
  }

  return filtros
}