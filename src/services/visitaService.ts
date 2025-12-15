const { VisitaRepo } = require ("../repositories/visitaRepo");
class VisitaService { static async crear(v: any) { return VisitaRepo.crear(v); } }

module.exports = { VisitaService };