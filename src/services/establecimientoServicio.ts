const { EstablecimientoRepo } = require ("../repositories/establecimientoRepo");
class EstablecimientoService {
    static async listar() { return EstablecimientoRepo.listar(); }
    static async crear(e: any) { return EstablecimientoRepo.crear(e); }
}

module.exports = { EstablecimientoService };