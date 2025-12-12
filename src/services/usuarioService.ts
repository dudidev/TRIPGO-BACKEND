const { UsuarioRepo } = require("../repositories/usuarioRepo");
import type { Usuario } from "../models/usuarioModel";
const { hashPassword, comparePassword } = require("../utils/password");
const { signToken } = require("../utils/jwt");

class UsuarioService {
    static async crear(usuario: Usuario) {
        usuario.password_u = await hashPassword(usuario.password_u);
        const result = await UsuarioRepo.crear(usuario);
        return result;
    }

    static async listar() {
        return UsuarioRepo.listar();
    }

    static async login(correo: string, password: string) {
        const user: any = await UsuarioRepo.findByEmail(correo);
        if (!user) throw new Error("Usuario no encontrado");
        const match = await comparePassword(password, user.password_u);
        if (!match) throw new Error("Credenciales inválidas");
        const token = signToken({ id: user.id, correo: user.correo_usuario, rol: user.rol });
        return { user, token };
    }
}
module.exports = { UsuarioService };