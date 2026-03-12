import {Router, Request, Response} from "express";
import TipoController from "../controllers/tipoController.js";

const router = Router();




/**
 * @swagger
 * tags:
 *   name: Tipos
 *   description: Gestión de tipos
 */

/**
 * @swagger
 * /tipos:
 *   get:
 *     summary: Listar tipos
 *     tags: [Tipos]
 *     responses:
 *       200:
 *         description: Lista de tipos
 */
router.get("/__debug", (_req: Request, res: Response) => {
  res.json({ ok: true, route: "tipoRoutes", has: "por-ubicacion" });
});
router.get("/", TipoController.listar);
router.get("/por-ubicacion/:town", TipoController.listarPorUbicacion);

export default router;