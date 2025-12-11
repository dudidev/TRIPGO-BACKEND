const { Router } = require("express");
const { register, login } = require("../controllers/authController");

const router = Router();

router.post("/register", register);
/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Autenticación y manejo de tokens
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Iniciar sesión con email y contraseña
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login exitoso, retorna JWT y refresh token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       401:
 *         description: Credenciales inválidas
 */
router.post("/login", login);

module.exports = router;