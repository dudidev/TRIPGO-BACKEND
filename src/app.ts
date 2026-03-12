import express, { Application, Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";

import routes from "./routes/index.js";
import authRoutes from "./routes/authRoutes.js";

import { errorHandler } from "./middlewares/errorMiddleware.js";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

const app: Application = express();

// ─── CORS ─────────────────────────────────────────────

const allowedOrigins: string[] = [
    "http://localhost:4200",
    "https://tripgoquindio.vercel.app",
    "https://tripgo-git-develop-dudidevs-projects.vercel.app",
];

const corsOptions: CorsOptions = {
    origin: (origin, callback) => {

        // Sin origin = Postman, curl, server-to-server
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        console.warn(`⚠️ [CORS] Origen bloqueado: ${origin}`);
        return callback(new Error(`CORS: origen no permitido → ${origin}`));
    },

    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// ─── Middleware global ─────────────────────────────────

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// ─── Rutas ─────────────────────────────────────────────

app.use("/", routes);
app.use("/auth", authRoutes);

app.get("/status", (_req: Request, res: Response) => {
    res.json({
        ok: true,
        message: "Servidor TripGO funcionando correctamente",
    });
});

// ─── Swagger ───────────────────────────────────────────

if (process.env.NODE_ENV === "production") {
    app.get("/api/docs.json", (_req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
}

app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
        customCss: ".swagger-ui .topbar { background-color: #0E6973; }",
        customSiteTitle: "TripGO API Docs",
    })
);

// ─── Error handler (siempre al final) ──────────────────

app.use(errorHandler);

export default app;