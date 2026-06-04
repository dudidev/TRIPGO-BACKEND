import { Router } from 'express';
import { body, param } from 'express-validator';
import { validateRequest } from '../middlewares/validateRequest.js'; // helper que verifica validationResult
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
// Pública — valida token en el service

router.get(
    '/:token',
    [
        param('token').notEmpty().withMessage('Token requerido.'),
    ],
    validateRequest,
    onboardingController.getSolicitudPorToken
);

// ─── POST /onboarding/:token/completar ──────────────────────────────────────
// Pública — valida token en el service

router.post(
    '/:token/completar',
    [

        param('token')
            .notEmpty()
            .withMessage('Token requerido.'),

        body('datos_completos')
            .notEmpty()
            .withMessage('Los datos del establecimiento son obligatorios.')
            .isObject()
            .withMessage('datos_completos debe ser un objeto.'),

        // ─── Categoría ─────────────────────────────

        body('datos_completos.categoria')
            .trim()
            .notEmpty()
            .withMessage('La categoría es obligatoria.'),

        // ─── Ubicación ─────────────────────────────

        body('datos_completos.ubicacion.departamento')
            .trim()
            .notEmpty()
            .withMessage('El departamento es obligatorio.'),

        body('datos_completos.ubicacion.municipio')
            .trim()
            .notEmpty()
            .withMessage('El municipio es obligatorio.'),

        body('datos_completos.ubicacion.direccion')
            .trim()
            .notEmpty()
            .withMessage('La dirección es obligatoria.'),

        body('datos_completos.ubicacion.googleMaps')
            .optional({ nullable: true, checkFalsy: true })
            .isURL()
            .withMessage('El enlace de Google Maps no es válido.'),

        // ─── Contacto ──────────────────────────────

        body('datos_completos.contacto.representante')
            .trim()
            .notEmpty()
            .withMessage('El representante es obligatorio.'),

        body('datos_completos.contacto.telefono')
            .trim()
            .notEmpty()
            .withMessage('El teléfono es obligatorio.'),

        body('datos_completos.contacto.whatsapp')
            .optional({ nullable: true, checkFalsy: true }),

        // ─── Experiencia ───────────────────────────

        body('datos_completos.experiencia.descripcionCompleta')
            .trim()
            .notEmpty()
            .withMessage('La descripción completa es obligatoria.')
            .isLength({ min: 50 })
            .withMessage('La descripción debe tener al menos 50 caracteres.'),

        body('datos_completos.experiencia.queHaceUnico')
            .trim()
            .notEmpty()
            .withMessage('Debes indicar qué hace único tu establecimiento.')
            .isLength({ min: 20 })
            .withMessage('Debe tener al menos 20 caracteres.'),

        // ─── Fotos ─────────────────────────────────

        body('fotos')
            .isArray({ min: 3, max: 8 })
            .withMessage('Debes subir entre 3 y 8 fotos.'),

        body('fotos.*')
            .isURL()
            .withMessage('Cada foto debe ser una URL válida.'),

        // ─── Servicios ─────────────────────────────

        body('servicios')
            .isArray({ min: 1 })
            .withMessage('Debes seleccionar al menos un servicio.'),

    ],
    validateRequest,
    onboardingController.completarOnboarding
);



router.patch(
    '/:id/rechazar',
    [
        param('id')
            .isInt().withMessage('ID inválido.'),

        body('motivo')
            .optional()
            .isString()
            .isLength({ max: 500 })
            .withMessage('Máximo 500 caracteres.')
    ],
    validateRequest,
    onboardingController.rechazarOnboarding
);

export default router;