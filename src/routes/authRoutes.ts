import Router from "express";
import { register, login } from "../controllers/authController.js";

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Crea una cuenta de usuario nueva en el sistema TripGO
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioRegistro'
 *           example:
 *             nombre_usuario: "Juan Pérez"
 *             correo_usuario: "juan@example.com"
 *             password_u: "miPassword123"
 *             rol: "usuario"
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario registrado exitosamente"
 *       400:
 *         description: Datos inválidos o correo ya registrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               camposFaltantes:
 *                 value:
 *                   message: "Todos los campos son obligatorios"
 *               correoExistente:
 *                 value:
 *                   message: "El correo ya está registrado"
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post("/register", register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Autentica un usuario y devuelve un token JWT para acceder a rutas protegidas
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioLogin'
 *           example:
 *             correo_usuario: "juan@example.com"
 *             password_u: "miPassword123"
 *     responses:
 *       200:
 *         description: Login exitoso, retorna token JWT y datos del usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *             example:
 *               message: "Inicio de sesión exitoso"
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sIjoidXN1YXJpbyJ9.xyz"
 *               user:
 *                 id: 1
 *                 nombre_usuario: "Juan Pérez"
 *                 correo_usuario: "juan@example.com"
 *                 rol: "usuario"
 *       400:
 *         description: Campos faltantes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: "Correo y contraseña son obligatorios"
 *       401:
 *         description: Contraseña incorrecta
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: "Contraseña incorrecta"
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: "Usuario no encontrado"
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post("/login", login);

export default router;