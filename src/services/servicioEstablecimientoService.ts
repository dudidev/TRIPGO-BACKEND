const { ServicioEstablecimientoRepo } = require ( "../repositories/servicioEstablecimientoRepo");
class ServicioEstablecimientoService {
    static async crear(s: any) { return await ServicioEstablecimientoRepo.crear(s); }
}

module.exports = { ServicioEstablecimientoService };