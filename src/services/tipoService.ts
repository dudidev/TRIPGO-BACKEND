const { TipoRepo } = require("../repositories/tipoRepo");

class TipoService {
    static async listar() { return await TipoRepo.listar(); }
    static async crear(t: any) { return await TipoRepo.crear(t); }
}

module.exports = { TipoService };