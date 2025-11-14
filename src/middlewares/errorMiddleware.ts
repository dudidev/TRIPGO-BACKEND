// src/middlewares/error.middleware.ts
import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(err.status || 500).json({
        ok: false,
        message: err.message || "Internal Server Error"
    });
};
