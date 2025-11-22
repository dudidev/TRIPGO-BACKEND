const { PlaneadorRepo } = require ("../repositories/planeadorRepo");
class PlaneadorService { static async crear(p: any) { return PlaneadorRepo.crear(p); } }

module.exports = { PlaneadorService };