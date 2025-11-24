const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const routes = require("./routes");
const authRoutes = require("./routes/authRoutes");
const pool = require("./config/db");
const { errorHandler } = require("./middlewares/errorMiddleware");

dotenv.config();
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente 🚀");
});

app.use(errorHandler);

// Verificar conexión a la base de datos
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log("✅ Conectado a la base de datos MySQL");
        connection.release();
    } catch (error) {
        console.error("❌ Error al conectar a la base de datos:", error);
    }
})();

// Puerto
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;