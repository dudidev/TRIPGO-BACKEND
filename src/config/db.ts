const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const sslOptions = isProduction
  ? {
      rejectUnauthorized: true,
      ca: process.env.DB_SSL_CA
        ? process.env.DB_SSL_CA.replace(/\\n/g, "\n")
        : undefined,
    }
  : {
      rejectUnauthorized: false,
    };

const pool = mysql.createPool({
  host: process.env.DB_HOST,               // tripgo-database.mysql.database.azure.com
  user: process.env.DB_USER,               // tripgoAdmin
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: sslOptions,
});

module.exports = pool;

console.log("SSL usado:", sslOptions);
