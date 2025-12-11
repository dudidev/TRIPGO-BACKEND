const swaggerJSDoc = require("swagger-jsdoc");
const swaggerDefinition = {
  openapi: "3.0.1",
  info: {
    title: "TripGO API",
    version: "1.0.0",
    description: "API backend de TripGO — documentación generada con swagger-jsdoc",
    contact: {
      name: "TripGO Team",
      email: "dev@tripgo.example"
    }
  },
  servers: [
    {
      url: process.env.NODE_ENV === "production"
        ? `https://${process.env.AZURE_WEBSITE_HOSTNAME || "your-production-host"}`
        : `http://localhost:${process.env.PORT || 4000}`,
      description: process.env.NODE_ENV === "production" ? "Producción" : "Desarrollo"
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ]
};

// Opciones para swagger-jsdoc: apuntamos a los archivos donde documentaremos las rutas
const options = {
  swaggerDefinition,
  // Reemplaza las rutas si tu proyecto las tiene en src/routes, src/controllers, etc.
  apis: [
    "./src/routes/*.ts",
    "./src/controllers/*.ts",
    "./src/models/*.ts",
    // si usas js:
    "./src/routes/*.js",
    "./src/controllers/*.js"
  ]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
