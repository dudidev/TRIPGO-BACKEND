// src/utils/jwt.ts
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "secret-key";
const EXPIRES_IN = "7d";

export const signToken = (payload: object) =>
    jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN });

export const verifyToken = (token: string) =>
    jwt.verify(token, JWT_SECRET) as object;
