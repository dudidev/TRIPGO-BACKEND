import DetallePlaneadorRepo from "../repositories/detallePlaneadorRepo.js";

class DetallePlaneadorService {


    static async crear(d: any) {

        const existente = await DetallePlaneadorRepo.buscar(d);

        if (existente) {
            const nuevaCantidad = existente.cantidad + (d.cantidad || 1);

            return await DetallePlaneadorRepo.actualizarCantidad(
                existente.id,
                nuevaCantidad
            );
        }

        return await DetallePlaneadorRepo.crear(d);
    }

 
    static async crearMuchos(detalles: any[]) {
        const resultados = [];

        for (const d of detalles) {
            const res = await this.crear(d);
            resultados.push(res);
        }

        return resultados;
    }
}

export default DetallePlaneadorService;