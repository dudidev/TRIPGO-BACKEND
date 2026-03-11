import ServicioEstablecimientoRepo from  "../repositories/servicioEstablecimientoRepo.js";
class ServicioEstablecimientoService {
    static async crear(s: any) { return await ServicioEstablecimientoRepo.crear(s); }
}

export default ServicioEstablecimientoService;