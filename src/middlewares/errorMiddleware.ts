import { Request, Response, NextFunction } from "express";
interface AppError extends Error {
    status?: number;
    code?: string;
}

export function errorHandler(
    err: AppError,
    _req: Request,
    res: Response,
    _next: NextFunction
): void {
    const statusCode = err.status ?? 500;

    console.error("xxx Error:", {
        message: err.message,
        code: err.code,
        stack: process.env.NODE_ENV !== "production"
            ? err.stack
            : undefined
    });

    // ─────────────────────────────────────────────
    // Errores MySQL / conexión
    // ─────────────────────────────────────────────
    if (
        err.code === "ECONNREFUSED" ||
        err.code === "PROTOCOL_CONNECTION_LOST" ||
        err.code === "ETIMEDOUT"
    ) {
        res.status(503).json({
            ok: false,
            message: "Base de datos temporalmente no disponible"
        });

        return;
    }

    res.status(statusCode).json({
        ok: false,
        message: err.message || "Error interno del servidor"
    });
}