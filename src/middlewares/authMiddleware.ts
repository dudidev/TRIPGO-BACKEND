import type { Request, Response, NextFunction } from "express";
import { verifyJwt } from '../utils/jwt.js';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET no está definido en las variables de entorno");
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.["auth_token"];

  if (!token) return res.status(401).json({ error: "Token requerido" });

  try {
    const decoded = verifyJwt(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
};

const requireEmpresa = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || req.user.rol !== "empresa") {
    return res.status(403).json({ error: "Acceso solo para empresa" });
  }
  next();
};

const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || req.user.rol !== "admin") {
    return res.status(403).json({ error: "Acceso solo para administradores" });
  }
  next();
};

export { verifyToken, requireEmpresa, requireAdmin };