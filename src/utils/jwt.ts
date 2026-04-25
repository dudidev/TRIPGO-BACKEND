import jwt from "jsonwebtoken";
import { AuthPayload } from "../types/auth";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET no está definido");
}

const EXPIRES_IN = "7d";

const signToken = (payload: AuthPayload) =>
    jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN });

const verifyJwt = (token: string): AuthPayload =>
    jwt.verify(token, JWT_SECRET) as AuthPayload;

export { signToken, verifyJwt };