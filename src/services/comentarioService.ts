const { ComentarioRepo } = require ("../repositories/comentarioRepo");
class ComentarioService {
    static async crear(c: any) { return await ComentarioRepo.crear(c); }
    static async listarPorUbicacion(id: number) { return await ComentarioRepo.listarPorUbicacion(id); }
}

module.exports = { ComentarioService };