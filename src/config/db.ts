const mysql = require("mysql2/promise");
const fs = require('fs');
const path = require('path');
const dotenv = require("dotenv");

dotenv.config();

const defaultCaPath = path.join(__dirname, 'DigiCertGlobalRootCA.pem');

// Permite sobreescribir con variable de entorno (ruta) o con el contenido (DB_SSL_CA)
const caPathFromEnv = process.env.DB_SSL_CA_PATH || defaultCaPath;

// Crea sslOptions de forma segura:
// 1) Si existe DB_SSL_CA (contenido PEM en la variable), úsalo.
// 2) Si existe un archivo en caPathFromEnv, léelo y úsalo.
// 3) Si no existe nada y estamos en development -> fallback (NO seguro).
// 4) Si no existe nada y estamos en production -> advertencia / opcionalmente fallar.
let sslOptions;

if (process.env.DB_SSL_CA) {
  // contenido PEM en variable de entorno (útil en App Services / CI)
  sslOptions = { ca: process.env.DB_SSL_CA };
} else if (fs.existsSync(caPathFromEnv)) {
  // archivo en disco
  const ca = fs.readFileSync(caPathFromEnv, "utf8");
  sslOptions = { ca };
} else {
  // No hay CA disponible
  if (process.env.NODE_ENV === "production") {
    console.error(
      "❌ DB SSL CA no encontrada. En production debes configurar DB_SSL_CA_PATH o DB_SSL_CA con el certificado raíz."
    );
    // Opcional: lanzar error para evitar iniciar sin SSL verificado
    // throw new Error("DB SSL CA missing in production");
    sslOptions = undefined; // no usar ssl si eliges no fallar (no recomendado)
  } else {
    console.warn(
      "⚠️ DB SSL CA no encontrada. Usando fallback (rejectUnauthorized: false) SOLO en development."
    );
    // fallback para desarrollo (conexión TLS sin verificación) — NO usar en prod
    sslOptions = { rejectUnauthorized: false };
  }
}

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306,
    waitForConnections: true,
    connectionLimit: parseInt(process.env.DB_CONN_LIMIT || "10", 10),
    queueLimit: 0,
    ...(sslOptions ? { ssl: sslOptions } : {})
});

module.exports = pool;
