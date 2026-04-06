import recomendacionRepo from "../repositories/recomendacionRepo.js";
import type { PerfilUsuario, RecomendacionPersonalizada, TipoFavorito } from "../models/recomendacionModel.js";

class RecomendacionService {

    // ========== CONSTRUIR PERFIL DEL USUARIO ==========

    async construirPerfilUsuario(idUsuario: number): Promise<PerfilUsuario> {

        // Obtener todas las interacciones del usuario
        const [resenas, favoritos, visualizaciones, itinerarios, busquedas] = await Promise.all([
            recomendacionRepo.obtenerResenasUsuario(idUsuario),
            recomendacionRepo.obtenerFavoritosUsuario(idUsuario),
            recomendacionRepo.obtenerHistorialUsuario(idUsuario),
            recomendacionRepo.obtenerItinerariosUsuario(idUsuario),
            recomendacionRepo.obtenerBusquedasUsuario(idUsuario)
        ]);

        // ========== CALCULAR TIPOS PREFERIDOS ==========
        const scoresPorTipo: { [key: string]: { id_tipo: number; nombre: string; score: number } } = {};

        // Reseñas: peso según calificación (más importante)
        resenas.forEach((r: any) => {
            const key = r.nombre_tipo;
            if (!scoresPorTipo[key]) {
                scoresPorTipo[key] = { id_tipo: r.tipo, nombre: r.nombre_tipo, score: 0 };
            }

            if (r.calificacion >= 4) {
                scoresPorTipo[key].score += 5 * r.calificacion; // Peso 5
            } else if (r.calificacion >= 3) {
                scoresPorTipo[key].score += 2;
            } else {
                scoresPorTipo[key].score -= 1; // Penalización por mala calificación
            }
        });

        // Favoritos: peso 4 (muy importante - guarda para después)
        favoritos.forEach((f: any) => {
            const key = f.nombre_tipo;
            if (!scoresPorTipo[key]) {
                scoresPorTipo[key] = { id_tipo: f.tipo, nombre: f.nombre_tipo, score: 0 };
            }
            scoresPorTipo[key].score += 4;
        });

        // Itinerarios: peso 3 (planea visitarlo)
        itinerarios.forEach((i: any) => {
            const key = i.nombre_tipo;
            if (!scoresPorTipo[key]) {
                scoresPorTipo[key] = { id_tipo: i.tipo, nombre: i.nombre_tipo, score: 0 };
            }
            scoresPorTipo[key].score += 3;
        });

        // Visualizaciones: peso 1 (solo vio)
        visualizaciones.forEach((v: any) => {
            const key = v.nombre_tipo;
            if (!scoresPorTipo[key]) {
                scoresPorTipo[key] = { id_tipo: v.tipo, nombre: v.nombre_tipo, score: 0 };
            }
            scoresPorTipo[key].score += v.veces_visto * 1;
        });

        // Búsquedas: peso 0.5 (interés inicial)
        busquedas.forEach((b: any) => {
            // Análisis simple de términos (puedes mejorar con NLP)
            const termino = b.termino_busqueda.toLowerCase();

            // Mapeo básico de términos a tipos
            const mapeoTerminos: { [key: string]: string } = {
                'hotel': 'Hotel',
                'hostal': 'Hostal',
                'restaurante': 'Restaurante',
                'cafe': 'Café',
                'bar': 'Bar',
                'parque': 'Parque temático',
                'museo': 'Museo',
                'finca': 'Finca turística'
            };

            for (const [palabra, tipo] of Object.entries(mapeoTerminos)) {
                if (termino.includes(palabra)) {
                    if (!scoresPorTipo[tipo]) {
                        scoresPorTipo[tipo] = { id_tipo: 0, nombre: tipo, score: 0 };
                    }
                    scoresPorTipo[tipo].score += 0.5 * b.veces_buscado;
                }
            }
        });

        const tiposPreferidos: TipoFavorito[] = Object.values(scoresPorTipo)
            .sort((a, b) => b.score - a.score)
            .slice(0, 5)
            .map(t => ({
                id_tipo: t.id_tipo,
                nombre_tipo: t.nombre,
                score: Math.round(t.score)
            }));

        // ========== CALCULAR UBICACIONES PREFERIDAS ==========
        const visitasPorUbicacion: { [key: string]: number } = {};

        // Pesos por fuente
        resenas.forEach((r: any) => {
            if (r.ubicacion) {
                visitasPorUbicacion[r.ubicacion] = (visitasPorUbicacion[r.ubicacion] || 0) + 5;
            }
        });

        favoritos.forEach((f: any) => {
            if (f.ubicacion) {
                visitasPorUbicacion[f.ubicacion] = (visitasPorUbicacion[f.ubicacion] || 0) + 4;
            }
        });

        itinerarios.forEach((i: any) => {
            if (i.ubicacion) {
                visitasPorUbicacion[i.ubicacion] = (visitasPorUbicacion[i.ubicacion] || 0) + 3;
            }
        });

        visualizaciones.forEach((v: any) => {
            if (v.ubicacion) {
                visitasPorUbicacion[v.ubicacion] = (visitasPorUbicacion[v.ubicacion] || 0) + 1;
            }
        });

        const ubicacionesPreferidas = Object.entries(visitasPorUbicacion)
            .map(([ubicacion, visitas]) => ({ ubicacion, visitas }))
            .sort((a, b) => b.visitas - a.visitas)
            .slice(0, 3);

        // ========== CALCULAR PROMEDIO DE CALIFICACIONES ==========
        const promedioCalificaciones = resenas.length > 0
            ? resenas.reduce((sum: number, r: any) => sum + r.calificacion, 0) / resenas.length
            : 0;

        const totalInteracciones =
            resenas.length +
            favoritos.length +
            visualizaciones.length +
            itinerarios.length +
            busquedas.length;

        // Guardar perfil en BD para futuras consultas
        // Al final de construirPerfilUsuario, reemplaza el await guardarPreferencias por:
        try {
            await recomendacionRepo.guardarPreferencias(idUsuario, {
                tipos_favoritos: tiposPreferidos,
                ubicaciones_favoritas: ubicacionesPreferidas.map(u => u.ubicacion),
                promedio_calificaciones: parseFloat(promedioCalificaciones.toFixed(2)),
                total_interacciones: totalInteracciones
            });
        } catch (e) {
            console.warn('No se pudo guardar preferencias:', e);
            // continúa sin crashear
        };

        return {
            tipos_favoritos: tiposPreferidos,
            ubicaciones_favoritas: ubicacionesPreferidas,
            promedio_calificaciones_dadas: parseFloat(promedioCalificaciones.toFixed(2)),
            total_interacciones: totalInteracciones
        };
    }

    // ========== GENERAR RECOMENDACIONES PERSONALIZADAS ==========

    async generarRecomendaciones(idUsuario: number, limite: number = 10): Promise<RecomendacionPersonalizada[]> {

        try {
            // 1. Construir perfil del usuario
            const perfil = await this.construirPerfilUsuario(idUsuario);

            // 2. Si el usuario no tiene interacciones, retornar top general
            if (perfil.total_interacciones === 0) {
                return this.obtenerTopGeneral(limite);
            }

            // 3. Obtener establecimientos que el usuario NO ha visto
            const establecimientosNoVistos = await recomendacionRepo.obtenerEstablecimientosNoVistos(idUsuario, 100);

            // 4. Calcular score de relevancia personalizado
            const recomendaciones = establecimientosNoVistos.map((est: any) => {
                let score = 0;
                const razones: string[] = [];

                // +50 puntos si el tipo está en favoritos
                const tipoFavorito = perfil.tipos_favoritos.find(t => t.nombre_tipo === est.nombre_tipo);
                if (tipoFavorito) {
                    const posicion = perfil.tipos_favoritos.indexOf(tipoFavorito);
                    const puntos = 50 - (posicion * 8);
                    score += puntos;
                    razones.push(`Te gustan los ${est.nombre_tipo.toLowerCase()}s`);
                }

                // +35 puntos si está en ubicación favorita
                const ubicacionFavorita = perfil.ubicaciones_favoritas.find((u: { ubicacion: string; }) =>
                    est.ubicacion && est.ubicacion.toLowerCase().includes(u.ubicacion.toLowerCase())
                );
                if (ubicacionFavorita) {
                    score += 35;
                    razones.push(`Has visitado ${ubicacionFavorita.ubicacion}`);
                }

                // +25 puntos si calificación del establecimiento es alta
                if (est.calificacion_promedio >= 4.5) {
                    score += 25;
                    razones.push("Muy bien calificado");
                } else if (est.calificacion_promedio >= 4.0) {
                    score += 15;
                } else if (est.calificacion_promedio >= 3.5) {
                    score += 5;
                }

                // +20 puntos si tiene muchas reseñas (popular y confiable)
                if (est.total_resenas >= 20) {
                    score += 20;
                    razones.push("Muy popular");
                } else if (est.total_resenas >= 10) {
                    score += 10;
                }

                // Penalización si es muy diferente a lo que le gusta
                if (!tipoFavorito && perfil.total_interacciones > 10) {
                    score -= 10;
                }

                return {
                    id_establecimiento: est.id_establecimiento,
                    nombre_establecimiento: est.nombre_establecimiento,
                    tipo: est.tipo,
                    nombre_tipo: est.nombre_tipo,
                    ubicacion: est.ubicacion,
                    direccion: est.direccion,
                    latitud: est.latitud,
                    longitud: est.longitud,
                    calificacion_promedio: parseFloat(est.calificacion_promedio),
                    total_resenas: est.total_resenas,
                    descripcion: est.descripcion,
                    telefono: est.telefono,
                    correo: est.correo,
                    horario_apertura: est.horario_apertura,
                    horario_cierre: est.horario_cierre,
                    score_relevancia: Math.max(0, score),
                    razon: razones.length > 0 ? razones.join(" • ") : "Podría interesarte"
                };
            });

            // 5. Ordenar por score y retornar top N
            return recomendaciones
                .sort((a, b) => b.score_relevancia - a.score_relevancia)
                .slice(0, limite);
        } catch (e) {
            console.warn('Error generando recomendaciones:', e);
            // Fallback a obtenerTopGeneral()
            return this.obtenerTopGeneral(limite);
        }
    }

    // ========== TOP GENERAL (para usuarios nuevos) ==========

    async obtenerTopGeneral(limite: number = 10): Promise<RecomendacionPersonalizada[]> {
        const rows = await recomendacionRepo.obtenerTopGeneral(limite);

        return rows.map((est: any) => ({
            id_establecimiento: est.id_establecimiento,
            nombre_establecimiento: est.nombre_establecimiento,
            tipo: est.tipo,
            nombre_tipo: est.nombre_tipo,
            ubicacion: est.ubicacion,
            direccion: est.direccion,
            latitud: est.latitud,
            longitud: est.longitud,
            calificacion_promedio: parseFloat(est.calificacion_promedio),
            total_resenas: est.total_resenas,
            descripcion: est.descripcion,
            telefono: est.telefono,
            correo: est.correo,
            horario_apertura: est.horario_apertura,
            horario_cierre: est.horario_cierre,
            score_relevancia: est.calificacion_promedio * 20,
            razon: "Mejor calificado en TripGO"
        }));
    }

    // ========== REGISTRAR VISUALIZACIÓN ==========

    async registrarVisualizacion(
        idUsuario: number,
        idEstablecimiento: number,
        tiempoSegundos: number = 0
    ): Promise<void> {

        // Verificar que el establecimiento existe
        const existe = await recomendacionRepo.establecimientoExiste(idEstablecimiento);
        if (!existe) {
            throw new Error("El establecimiento no existe");
        }

        await recomendacionRepo.registrarVisualizacion({
            id_usuario: idUsuario,
            id_establecimiento: idEstablecimiento,
            tiempo_visualizacion: tiempoSegundos
        });
    }

    // ========== OBTENER PERFIL GUARDADO ==========

    async obtenerPerfilGuardado(idUsuario: number): Promise<any> {
        const perfil = await recomendacionRepo.obtenerPreferencias(idUsuario);

        if (!perfil) {
            // Si no tiene perfil guardado, construirlo
            return await this.construirPerfilUsuario(idUsuario);
        }

        return {
            tipos_favoritos: perfil.tipos_favoritos,
            ubicaciones_favoritas: perfil.ubicaciones_favoritas.map((u: string) => ({ ubicacion: u, visitas: 0 })),
            promedio_calificaciones_dadas: perfil.promedio_calificaciones,
            total_interacciones: perfil.total_interacciones
        };
    }
}

export default new RecomendacionService();