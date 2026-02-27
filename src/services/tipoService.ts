const { TipoRepo } = require("../repositories/tipoRepo");

class TipoService {
    static async listar() { return await TipoRepo.listar(); }

    static async listarPorUbicacion(town: string) {
    return await TipoRepo.listarPorUbicacion(town);
  }
  
    static async crear(t: any) { return await TipoRepo.crear(t); }
}

module.exports = { TipoService };