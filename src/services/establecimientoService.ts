const { EstablecimientoRepo } = require ("../repositories/establecimientoRepo");
class EstablecimientoService {
    static async listar() { return await EstablecimientoRepo.listar(); }
    static async crear(e: any) { return await EstablecimientoRepo.crear(e); }
}

module.exports = { EstablecimientoService };