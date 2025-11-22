const { ComentarioRepo } = require ("../repositories/comentarioRepo");
class ComentarioService {
    static async crear(c: any) { return ComentarioRepo.crear(c); }
    static async listarPorUbicacion(id: number) { return ComentarioRepo.listarPorUbicacion(id); }
}

module.exports = { ComentarioService };