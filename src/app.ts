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

// ------------ CORS ---------------------
const allowedOrigins = [
    "http://localhost:4200",
    "https://tripgoquindio.vercel.app",
    "https://tripgo-git-develop-dudidevs-projects.vercel.app"
];

app.use(cors({
    origin: (origin, callback) => {
        // Permite peticiones sin origin (Postman, server-to-server) en desarrollo
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`CORS bloqueado: origen no permitido → ${origin}`));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

// ----------------Midddleware global----------------
app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// -----------Rutas----------------
app.use("/", routes);
app.use("/auth", authRoutes);

app.get("/status", (req, res) => {
    res.send("Servidor funcionando correctamente");
});



// -- Swagger ---------------------------------------------------
if (process.env.NODE_ENV === "production") {
    app.get("/api/docs.json", (_req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });

    app.use(
        "/docs",
        swaggerUi.serve,
        swaggerUi.setup(swaggerSpec, { explorer: true })
    );
}
app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, { explorer: true })
);

// --Error handler global ---------------------------
app.use(errorHandler);

// -- Verificar conexión a la base de datos al iniciar el servidor --------------------
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