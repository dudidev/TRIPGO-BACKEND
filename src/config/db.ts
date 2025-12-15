const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,

  // 🔐 SSL correcto para Azure MySQL Flexible Server
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;

console.log("✅ Pool MySQL creado con SSL de Azure");
