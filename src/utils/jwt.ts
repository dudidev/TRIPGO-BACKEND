import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET no está definido en las variables de entorno");
}

const EXPIRES_IN = "7d";

const signToken = (payload: object) =>
    jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN });

const verifyToken = (token: string) =>
    jwt.verify(token, JWT_SECRET) as object;

export { signToken, verifyToken };