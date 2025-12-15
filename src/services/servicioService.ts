const {ServicioRepo} = require("../repositories/servicioRepo");
class ServicioService {
    static async listar() { return await ServicioRepo.listar(); }
    static async crear(s: any) { return await ServicioRepo.crear(s); }
}

module.exports = { ServicioService };