// src/server.ts
const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`TripGO backend corriendo en http://localhost:${PORT}`);
});
