const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

const routes = require("./routes");
const authRoutes = require("./routes/authRoutes");

const pool = require("./config/db");
const { errorHandler } = require("./middlewares/errorMiddleware");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

dotenv.config();
const app = express();

// ─── CORS ─────────────────────────────────────────────────────────────────────
const allowedOrigins = [
    "http://localhost:4200",
    "https://tripgoquindio.vercel.app",
    "https://tripgo-git-develop-dudidevs-projects.vercel.app",   // ← rama develop
    // Agrega aquí cualquier otro dominio de Vercel que uses (preview, producción, etc.)
];

app.use(cors({
    origin: (origin, callback) => {
        // Sin origin = Postman, curl, server-to-server → permitir en todos los entornos
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.warn(`⚠️  [CORS] Origen bloqueado: ${origin}`);
            callback(new Error(`CORS: origen no permitido → ${origin}`));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));

// Responde el preflight OPTIONS globalmente (requerido para POST con JSON)
app.options("*", cors());

// ─── Middleware global ────────────────────────────────────────────────────────
app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// ─── Rutas ────────────────────────────────────────────────────────────────────
app.use("/", routes);
app.use("/auth", authRoutes);

app.get("/status", (_req, res) => {
    res.json({ ok: true, message: "Servidor TripGO funcionando correctamente" });
});

// ─── Swagger ──────────────────────────────────────────────────────────────────
if (process.env.NODE_ENV === "production") {
    app.get("/api/docs.json", (_req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
}

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

// ─── Error handler (siempre al final) ────────────────────────────────────────
app.use(errorHandler);

// ─── Conexión BD ──────────────────────────────────────────────────────────────
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log("Conectado a la base de datos MySQL");
        connection.release();
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
    }
})();

module.exports = app;