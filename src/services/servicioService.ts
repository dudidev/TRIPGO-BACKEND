import ServicioRepo from "../repositories/servicioRepo.js";

class ServicioService {

    static async listar() {
        return await ServicioRepo.listar();
    }

    static async crear(data: any) {
        return await ServicioRepo.crear(data);
    }

    static async porEstablecimiento(id: number) {
        return await ServicioRepo.porEstablecimiento(id);
    }
}

export default ServicioService;