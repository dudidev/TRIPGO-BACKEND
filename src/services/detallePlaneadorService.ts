const { DetallePlaneadorRepo } = require("../repositories/detallePlaneadorRepo");
class DetallePlaneadorService { static async crear(d: any) { return await DetallePlaneadorRepo.crear(d); } }

module.exports = { DetallePlaneadorService };