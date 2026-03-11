import PlaneadorRepo from "../repositories/planeadorRepo.js";
class PlaneadorService { static async crear(p: any) { return await PlaneadorRepo.crear(p); } }

export default PlaneadorService;