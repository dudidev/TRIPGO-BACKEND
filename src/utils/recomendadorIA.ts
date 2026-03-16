export function calcularScore(lugar: any) {

  const calificacion = lugar.calificacion_promedio || 0
  const totalResenas = lugar.total_resenas || 0

  const score =
    (calificacion * 0.7) +
    (totalResenas * 0.3)

  return score
}