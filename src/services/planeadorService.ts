const { PlaneadorRepo } = require ("../repositories/planeadorRepo");
class PlaneadorService { static async crear(p: any) { return await PlaneadorRepo.crear(p); } }

module.exports = { PlaneadorService };