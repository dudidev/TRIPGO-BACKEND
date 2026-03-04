const { UsuarioRepo } = require("../repositories/usuarioRepo");
import type { Usuario } from "../models/usuarioModel";
const { hashPassword, comparePassword } = require("../utils/password");
const { signToken } = require("../utils/jwt");
const { uploadToCloudinary, deleteImage } = require("./cloudinaryService");

class UsuarioService {
    static async crear(usuario: Usuario) {
        usuario.password_u = await hashPassword(usuario.password_u);
        const result = await UsuarioRepo.crear(usuario);
        return result;
    }

    static async login(correo: string, password: string) {
        const user: any = await UsuarioRepo.findByEmail(correo);
        if (!user) throw new Error("Usuario no encontrado");
        const match = await comparePassword(password, user.password_u);
        if (!match) throw new Error("Credenciales inválidas");
        const token = signToken({ id: user.id, correo: user.correo_usuario, rol: user.rol });
        delete user.password_u;
        return { user, token };
    }

    static async listar() {
        return await UsuarioRepo.listar();
    }

    static async obtenerPorId(id: number) {
    const usuario = await UsuarioRepo.findById(id);
    if (!usuario) {
        throw new Error("Usuario no encontrado");
    }
    return usuario;
    }

    static async actualizar(id: number, data: Partial<Usuario>) {

        if (data.password_u) {
            data.password_u = await hashPassword(data.password_u);
        }

        await UsuarioRepo.actualizar(id, data);

        return { message: "Usuario actualizado correctamente" };
    }
    

    static async eliminar(id: number) {
        await UsuarioRepo.eliminar(id);
        return { message: "Usuario eliminado correctamente" };
    }


    static async cambiarPassword(
    id: number,
    password_actual: string,
    password_nueva: string
) {

    const user: any = await UsuarioRepo.findByIdWithPassword(id);

    if (!user) {
        throw new Error("Usuario no encontrado");
    }

    const match = await comparePassword(password_actual, user.password_u);

    if (!match) {
        throw new Error("La contraseña actual es incorrecta");
    }

    const hashed = await hashPassword(password_nueva);

    await UsuarioRepo.actualizar(id, {
        password_u: hashed
    });

    return { message: "Contraseña actualizada correctamente" };
}

    static async actualizarFotoPerfil(id: number, file: any) {

       
        const user: any = await UsuarioRepo.findById(id);

        if (!user) {
            throw new Error("Usuario no encontrado");
        }

       
        if (user.foto_public_id) {
            await deleteImage(user.foto_public_id);
        }

        const result = await uploadToCloudinary(
            file.buffer,
            "usuarios/perfil"
        );

        
        await UsuarioRepo.actualizar(id, {
            foto_perfil: result.secure_url,
            foto_public_id: result.public_id
        });

        return {
            message: "Foto de perfil actualizada correctamente",
            url: result.secure_url
        };
}

}
module.exports = { UsuarioService };