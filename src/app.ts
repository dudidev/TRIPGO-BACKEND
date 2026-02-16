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

app.use(cors({
    origin: [
        "http://localhost:4200",
        "https://tripgoquindio.vercel.app/"
    ],
    credentials: true
}));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente");
});


if (process.env.NODE_ENV === "production") {
    app.get("/api/docs.json", (_req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });

    app.use(
        "/api/docs",
        swaggerUi.serve,
        swaggerUi.setup(swaggerSpec, { explorer: true })
    );
}

app.use(errorHandler);

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