const { DetallePlaneadorRepo } = require("../repositories/detallePlaneadorRepo");
class DetallePlaneadorService { static async crear(d: any) { return DetallePlaneadorRepo.crear(d); } }

module.exports = { DetallePlaneadorService };