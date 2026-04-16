import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
    const envFile = `.env.${process.env.NODE_ENV || "development"}`;
    dotenv.config({ path: envFile });
    console.log("ENV cargado:", envFile);
}

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_NAME:", process.env.DB_NAME);