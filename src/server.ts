import "./config/env.js";
import app from "./app.js";
import pool  from "./config/db.js";

const PORT = process.env.PORT || 8080;

// ─── Conexión BD ──────────────────────────────────────────────────────────────
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log("Conectado a la base de datos MySQL");
        connection.release();

        app.listen(PORT, () => {
            console.log(`Environment: ${process.env.NODE_ENV}`);
            process.env.NODE_ENV == "production"
            ? console.log(`TripGO backend corriendo en https://tripgo-backend-arehbhbubshxdpg7.chilecentral-01.azurewebsites.net`)
            : console.log(`TripGO backend corriendo en http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
    }
})();


