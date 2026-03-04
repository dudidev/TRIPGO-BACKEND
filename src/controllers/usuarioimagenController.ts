// src/controllers/usuarioImagenController.js
const pool = require("../config/db");
const { uploadToCloudinary } = require("../services/cloudinaryService");

const subirFotoPerfil = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: "No se envió ninguna imagen" });
    }

    // Validar que el usuario exista
    const [rows] = await pool.query(
      "SELECT id FROM usuarios WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "El usuario no existe" });
    }

    // Subir a Cloudinary (igual que lugares)
    const result = await uploadToCloudinary(req.file.buffer);

    // Guardar URL en usuarios.foto_perfil
    await pool.query(
      "UPDATE usuarios SET foto_perfil = ? WHERE id = ?",
      [result.secure_url, id]
    );

    return res.status(200).json({
      message: "Foto de perfil actualizada correctamente",
      url: result.secure_url,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = { subirFotoPerfil };