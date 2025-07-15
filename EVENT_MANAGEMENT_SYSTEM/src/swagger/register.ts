import {
  OpenAPIRegistry,
  extendZodWithOpenApi,
} from "@asteasolutions/zod-to-openapi";
import { z } from "zod/v4";
extendZodWithOpenApi(z);

const registry = new OpenAPIRegistry();

const loginRequestSchema = z
  .object({
    name: z.string(),
  })
  .openapi("LoginRequest");

const loginResponseSchema = z
  .object({
    message: z.string(),
    token: z.string(),
  })
  .openapi("LoginResponse");

registry.registerPath({
  method: "post",
  path: "/attendee/login",
  summary: "Login attendee",
  request: {
    body: {
      content: {
        "application/json": {
          schema: loginRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Login success",
      content: {
        "application/json": {
          schema: loginResponseSchema,
        },
      },
    },
  },
});

export { registry };

console.dir(registry, { depth: 7, showHidden: true, colors: true });
