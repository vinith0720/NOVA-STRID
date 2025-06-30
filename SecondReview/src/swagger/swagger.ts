// import Openapi from "zod-to-openapi";
// import swaggerUi from "swagger-ui-express";
// import { Application } from "express";
// import { BookRegister } from "./register";

// const generator = new OpenApiGeneratorV3(BookRegister);

// const openApiDoc = generator.generateDocument({
//   openapi: "3.0.0",
//   info: {
//     title: "My API",
//     version: "1.0.0",
//     description: "Auto-generated from Zod DTOs",
//   },
//   servers: [{ url: "http://localhost:3000" }],
// });

// export function setUpSwagger(app: Application) {
//   app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiDoc));
// }
