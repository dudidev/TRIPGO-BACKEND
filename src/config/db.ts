const mysql = require("mysql2/promise");
const fs = require('fs');
const path = require('path');
const dotenv = require("dotenv");

dotenv.config();

const sslCert = path.resolve(__dirname, 'BaltimoreCyberTrustRoot.crt.pem');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306,
    waitForConnections: true,
    connectionLimit: parseInt(process.env.DB_CONN_LIMIT || "10", 10),
    queueLimit: 0,
    ssl: {
    ca: fs.readFileSync(sslCert)
  }
});

module.exports = { pool };
