const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

const useSSL = process.env.DB_SSL === "true"; // true en Azure, false en local

const poolConfig: any = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

if (useSSL) {
  poolConfig.ssl = { rejectUnauthorized: false };
  console.log("✅ Pool MySQL creado con SSL (Azure)");
} else {
  console.log("✅ Pool MySQL creado SIN SSL (Local)");
}

const pool = mysql.createPool(poolConfig);

module.exports = pool;
