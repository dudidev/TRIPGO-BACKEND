import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "tripgo",
    waitForConnections: true,
    connectionLimit: parseInt(process.env.DB_CONN_LIMIT || "10", 10),
    queueLimit: 0
});
