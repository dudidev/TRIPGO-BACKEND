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
    "https://tripgo-git-develop-dudidevs-projects.vercel.app",
];

const corsOptions = {
    origin: (origin, callback) => {
        // Sin origin = Postman, curl, server-to-server → permitir
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        console.warn(`⚠️  [CORS] Origen bloqueado: ${origin}`);
        return callback(new Error(`CORS: origen no permitido → ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    // preflightContinue: false hace que cors() responda el OPTIONS por sí solo,
    // eliminando la necesidad de app.options("*") que rompe con path-to-regexp v8+
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

// Un solo app.use maneja tanto el preflight OPTIONS como las requests normales
app.use(cors(corsOptions));

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