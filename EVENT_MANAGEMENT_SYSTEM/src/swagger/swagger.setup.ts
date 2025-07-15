import { registry } from "@swagger/register.js";
import swaggerui from "swagger-ui-express";
import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { Application } from "express";

const generator = new OpenApiGeneratorV3(registry.definitions);

const swaggerdoc = generator.generateDocument({
  openapi: "3.0.0",
  info: {
    title: "EVENT MANAGEMENT SYSTEM",
    version: "1.0.0",
    description: "auto generated from zod",
  },
  servers: [{ url: "http://localhost:3000" }],
});

export const swaggerSetUp = (app: Application) => {
  app.use("/api-docs", swaggerui.serve, swaggerui.setup(swaggerdoc));
};
