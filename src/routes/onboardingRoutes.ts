import { Router } from 'express';
import { body, param } from 'express-validator';

import upload from '../middlewares/upload.js';
import { validateRequest } from '../middlewares/validateRequest.js';

import * as onboardingController from '../controllers/onboardingController.js';

const router = Router();

// ─── POST /onboarding/solicitud-inicial ─────────────────────────────────────
// Pública — no requiere auth

router.post(
    '/solicitud-inicial',
    [
        body('nombre_establecimiento')
            .trim()
            .notEmpty().withMessage('El nombre del negocio es obligatorio.')
            .isLength({ max: 255 }).withMessage('Máximo 255 caracteres.'),

        body('nombre_contacto')
            .trim()
            .notEmpty().withMessage('El nombre de contacto es obligatorio.')
            .isLength({ max: 255 }).withMessage('Máximo 255 caracteres.'),

        body('correo_contacto')
            .trim()
            .notEmpty().withMessage('El correo es obligatorio.')
            .isEmail().withMessage('Correo inválido.')
            .normalizeEmail(),

        body('descripcion')
            .trim()
            .notEmpty().withMessage('La descripción es obligatoria.')
            .isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres.'),
    ],
    validateRequest,
    onboardingController.crearSolicitudInicial
);

// ─── GET /onboarding/:token ──────────────────────────────────────────────────

router.get(
    '/:token',
    [
        param('token').notEmpty().withMessage('Token requerido.'),
    ],
    validateRequest,
    onboardingController.getSolicitudPorToken
);

// ─── POST /onboarding/:token/fotos ───────────────────────────────────────────
// Sube imágenes a Cloudinary y devuelve URLs

router.post(
    '/:token/fotos',
    [
        param('token').notEmpty().withMessage('Token requerido.'),
    ],
    validateRequest,
    upload.array('imagenes', 8),
    onboardingController.subirFotosOnboarding
);

// ─── POST /onboarding/:token/completar ──────────────────────────────────────

router.post(
    '/:token/completar',
    [
        param('token').notEmpty().withMessage('Token requerido.'),

        body('datos_completos')
            .notEmpty().withMessage('Los datos del establecimiento son obligatorios.')
            .isObject().withMessage('datos_completos debe ser un objeto.'),

        body('fotos')
            .isArray({ min: 3, max: 8 })
            .withMessage('Debes subir entre 3 y 8 fotos.'),

        body('fotos.*')
            .isURL()
            .withMessage('Cada foto debe ser una URL válida.'),

        body('servicios')
            .isArray()
            .withMessage('servicios debe ser un array.'),
    ],
    validateRequest,
    onboardingController.completarOnboarding
);

export default router;