import DetallePlaneadorRepo from "../repositories/detallePlaneadorRepo.js";
class DetallePlaneadorService { static async crear(d: any) { return await DetallePlaneadorRepo.crear(d); } }


export default DetallePlaneadorService;