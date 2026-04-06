import ServicioRepo from "../repositories/servicioRepo.js";
class ServicioService {
    static async listar() { return await ServicioRepo.listar(); }
    static async crear(s: any) { return await ServicioRepo.crear(s); }
}

export default ServicioService ;