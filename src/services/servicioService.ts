const { ServicioRepo } =  require("../repositories/servicioRepo");
class ServicioService {
    static async listar() { return ServicioRepo.listar(); }
    static async crear(s: any) { return ServicioRepo.crear(s); }
}

module.exports = { ServicioService };