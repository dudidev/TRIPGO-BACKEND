const { EstablecimientoRepo } = require ("../repositories/establecimientoRepo");
class EstablecimientoService {
    static async listar() { return await EstablecimientoRepo.listar(); }
     static async listarPorUbicacionYTipo(town: string, idTipo: number) {
  return await EstablecimientoRepo.listarPorUbicacionYTipo(town, idTipo);
}
    static async crear(e: any) { return await EstablecimientoRepo.crear(e); }
}

module.exports = { EstablecimientoService };