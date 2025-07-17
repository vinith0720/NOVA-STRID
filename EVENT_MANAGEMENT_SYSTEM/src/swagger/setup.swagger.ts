import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";
import { Register } from "./register.swagger.js";

const generator = new OpenApiGeneratorV3(Register.definitions);

const openApiDoc = generator.generateDocument({
  openapi: "3.0.0",
  info: {
    title: "My API",
    version: "1.0.0",
    description: "Auto-generated from Zod DTOs",
  },
  servers: [{ url: "http://localhost:3000" }],
  security: [{}],
});

export function setUpSwagger(app: Application) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDoc));
}
