import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
    const envFile = `.env.${process.env.NODE_ENV || "development"}`;
    dotenv.config({ path: envFile });
    console.log("ENV cargado:", envFile);
}