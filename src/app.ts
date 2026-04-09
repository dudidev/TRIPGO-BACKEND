import express, { Application, Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";

import routes from "./routes/index.js";
import authRoutes from "./routes/authRoutes.js";

import { errorHandler } from "./middlewares/errorMiddleware.js";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import cookieParser from "cookie-parser";

const app: Application = express();

// ─── CORS ─────────────────────────────────────────────

const allowedOrigins: string[] = [
    "http://localhost:4200",
    "https://tripgoquindio.vercel.app",
    "https://www.tripgoquindio.vercel.app",
    "https://tripgo-git-develop-dudidevs-projects.vercel.app",
];

const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);

        console.warn(`⚠️ [CORS] Origen bloqueado: ${origin}`);
        return callback(new Error(`CORS: origen no permitido → ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// ─── Cookie parser ─────────────────────────────────────

app.use(cookieParser());

// ─── Middleware global ─────────────────────────────────

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));


// ─── Rutas ─────────────────────────────────────────────

app.use("/", routes);
app.use("/auth", authRoutes);

// En tu router principal o app.ts del backend
app.get('/health', (req, res) => {
    res.json({
        ok: true,
        origin: req.headers['origin'] ?? 'no-origin',
        userAgent: req.headers['user-agent']
    });
});

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