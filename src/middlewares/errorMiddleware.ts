import { Request, Response, NextFunction } from "express";
interface AppError extends Error {
    status?: number;
}

export function errorHandler(
    err: AppError,
    _req: Request,
    res: Response,
    _next: NextFunction
): void {
    const statusCode = err.status ?? 500;
    const message = err.message ?? 'Error interno del servidor.';

    // Nunca exponer stack en producción
    if (process.env.NODE_ENV !== 'production') {
        console.error(`[ERROR ${statusCode}]`, err.stack);
    }

    res.status(statusCode).json({ message });
}