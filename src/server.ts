import "./config/env.js";
import app from "./app.js";
import pool from "./config/db.js";

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {

    console.log(`Environment: ${process.env.NODE_ENV}`);

    process.env.NODE_ENV === "production"
        ? console.log(`TripGO backend corriendo en https://api.tripgoapp.com`)
        : console.log(`TripGO backend corriendo en http://localhost:${PORT}`);

});

// ───────────────────────────────────────────────────────
// Monitor resiliente MySQL
// ───────────────────────────────────────────────────────
const sleep = (ms: number) =>
    new Promise(resolve => setTimeout(resolve, ms));

const startDatabaseMonitor = async () => {

    while (true) {

        try {
            await pool.query("SELECT 1");
            console.log("---MySQL conectada---");
            await sleep(30000);

        } catch (error) {
            console.error("xxx MySQL no disponible:", error);
            await sleep(5000);
        }
    }
};

startDatabaseMonitor();

process.on("unhandledRejection", (reason) => {
    console.error("xxx Unhandled Rejection:", reason);
});

process.on("uncaughtException", (error) => {
    console.error("xxx Uncaught Exception:", error);
});


