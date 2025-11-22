// src/services/Tipo.service.ts
const { TipoRepo } =  require("../repositories/tipoRepo");
class TipoService {
    static async listar() { return TipoRepo.listar(); }
}

module.exports = { TipoService };