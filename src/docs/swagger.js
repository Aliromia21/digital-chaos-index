// src/docs/swagger.js
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Digital Chaos Index API",
      version: "1.0.0",
      description: "SaaS to measure and visualize your digital chaos score",
    },
    servers: [
      { url: "http://localhost:5000/api" } 
    ],
    components: {
      securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/*.js"], 
};

export function setupSwagger(app) {
  const specs = swaggerJsdoc(options);
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));
  if (process.env.NODE_ENV !== "test") {
    console.log("📘 Swagger Docs at /api/docs");
  }
}

