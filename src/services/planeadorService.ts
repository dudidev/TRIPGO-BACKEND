import PlaneadorRepo from "../repositories/planeadorRepo.js";

class PlaneadorService {

    static async crear(data:any) {
        return await PlaneadorRepo.crear(data);
    }

    
    static async obtenerDetalle(id: number) {
        return await PlaneadorRepo.obtenerDetalle(id);
    }
}

export default PlaneadorService;