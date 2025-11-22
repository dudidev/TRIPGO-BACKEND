const { ServicioEstablecimientoRepo } = require ( "../repositories/servicioEstablecimientoRepo");
class ServicioEstablecimientoService {
    static async crear(s: any) { return ServicioEstablecimientoRepo.crear(s); }
}

module.exports = { ServicioEstablecimientoService };