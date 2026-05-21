import { Router } from 'express';
import { param } from 'express-validator';
import { verifyToken, requireAdmin } from '../middlewares/authMiddleware.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import * as adminController from '../controllers/adminController.js';

const router = Router();

// Todas las rutas admin requieren JWT válido + rol admin
router.use(verifyToken, requireAdmin);

// ─── GET /admin/solicitudes ───────────────────────────────────────────────────

router.get('/solicitudes', adminController.listarSolicitudes);

// ─── POST /admin/solicitudes/:id/aprobar ─────────────────────────────────────

router.post(
    '/solicitudes/:id/aprobar',
    [
        param('id').isInt({ min: 1 }).withMessage('ID debe ser un número entero positivo.'),
    ],
    validateRequest,
    adminController.aprobar
);

export default router;