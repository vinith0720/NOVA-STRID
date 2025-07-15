import {
  OpenAPIRegistry,
  extendZodWithOpenApi,
} from "@asteasolutions/zod-to-openapi";
import { createAttendeSchema } from "@dto/attandee.dto.js";
import { ResponseSchema } from "@dto/index.dto.js";
import { z } from "zod";
extendZodWithOpenApi(z);
const registry = new OpenAPIRegistry();

registry.registerPath({
  method: "post",
  path: "/attendee/login",
  summary: "Login attendee",
  request: {
    body: {
      content: {
        "application/json": {
          schema: createAttendeSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Login success",
      content: {
        "application/json": {
          schema: ResponseSchema,
        },
      },
    },
  },
});

export { registry };

// console.dir(registry, { depth: 7, showHidden: true, colors: true });
