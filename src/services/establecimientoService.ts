const { EstablecimientoRepo } = require("../repositories/establecimientoRepo");
class EstablecimientoService {
    static async listar() { return await EstablecimientoRepo.listar(); }
    static async listarPorUbicacionYTipo(town: string, idTipo: number) {
        return await EstablecimientoRepo.listarPorUbicacionYTipo(town, idTipo);
    }
    static async crear(e: any) { return await EstablecimientoRepo.crear(e); }
    static async getMio(req: any, res: any) {
        return await EstablecimientoRepo.getMio(req, res);
    }
    static async updateMio(req: any, res: any) {
        return await EstablecimientoRepo.updateMio(req, res);
    }
    static async getMios(req: any, res: any) {
        return await EstablecimientoRepo.getMios(req, res);
    }
    static async updateMioById(req: any, res: any) {
        return await EstablecimientoRepo.updateMioById(req, res);
    }
}

module.exports = { EstablecimientoService };