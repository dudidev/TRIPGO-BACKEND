// src/services/Ubicacion.service.ts
const { UbicacionRepo } =  require("../repositories/ubicacionRepo");
class UbicacionService {
    static async listar() {
        return UbicacionRepo.listar();
    }
    static async crear(u: any) { return UbicacionRepo.crear(u); }
}

module.exports = { UbicacionService };