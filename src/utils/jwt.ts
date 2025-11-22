// src/utils/jwt.ts
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "secret-key";
const EXPIRES_IN = "7d";

const signToken = (payload: object) =>
    jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN });

const verifyToken = (token: string) =>
    jwt.verify(token, JWT_SECRET) as object;

module.exports = { signToken, verifyToken };