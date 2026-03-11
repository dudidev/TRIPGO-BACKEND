import TipoRepo from "../repositories/tipoRepo.js";

class TipoService {
    static async listar() { return await TipoRepo.listar(); }

    static async listarPorUbicacion(town: string) {
    return await TipoRepo.listarPorUbicacion(town);
  }
  
    static async crear(t: any) { return await TipoRepo.crear(t); }
}

export default TipoService;