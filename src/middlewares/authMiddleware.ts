import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
if(!JWT_SECRET) {
  throw new Error("JWT_SECRET no está definido en las variables de entorno");
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) return res.status(401).json({ error: "Token requerido" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
};

const requireEmpresa = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;
  if (!user || user.rol !== "empresa") {
    return res.status(403).json({ error: "Acceso solo para empresa" });
  }
  next();
};

export { verifyToken, requireEmpresa };
