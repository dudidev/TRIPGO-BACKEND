import VisitaRepo from "../repositories/visitaRepo.js";
class VisitaService { static async crear(v: any) { return VisitaRepo.crear(v); } }

export default VisitaService;