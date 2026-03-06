const pool = require("../config/db");
const { uploadToCloudinary } = require("../services/cloudinaryService");

const subirImagenLugar = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: "No se envió ninguna imagen" });
    }

    const [rows] = await pool.query(
      "SELECT id_establecimiento FROM establecimiento WHERE id_establecimiento = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "El establecimiento no existe" });
    }

    const result = await uploadToCloudinary(req.file.buffer);

    await pool.query(
      "INSERT INTO imagenes_e (id_lugar, url) VALUES (?, ?)",
      [id, result.secure_url]
    );

    res.status(201).json({
      message: "Imagen subida correctamente",
      url: result.secure_url,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const obtenerImagenesLugar = async (req, res) => {
  try {
    const { id } = req.params;

    const [imagenes] = await pool.query(
      "SELECT id_ima, url FROM imagenes_e WHERE id_lugar = ?",
      [id]
    );

    res.json({
      total: imagenes.length,
      imagenes
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las imágenes" });
  }
};


module.exports = { subirImagenLugar, obtenerImagenesLugar };