import { z } from "@utils/zod.js";
import {
  OpenAPIRegistry,
  // extendZodWithOpenApi,
} from "@asteasolutions/zod-to-openapi";
// extendZodWithOpenApi(z);
import { createAttendeSchema } from "@dto/attandee.dto.js";
import { ResponseSchema } from "@dto/index.dto.js";
import {
  createEventSchema,
  createEventSchemaSuccess,
  idValidateSchema,
  updateEventSchema,
} from "@dto/event.dto.js";

export const Register = new OpenAPIRegistry();

Register.registerComponent("securitySchemes", "bearerAuth", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
});

Register.registerPath({
  method: "post",
  path: "/attendee/login",
  summary: "GET JWT TOKEN",
  description: "use attendee credentials to get a valid jwt token",
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
          schema: ResponseSchema.pick({ message: true }).extend({
            token: z.string().openapi({
              description: "json web token",
              example:
                "yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGlsZXNoIiwiZW1haWwiOiJ0aWxlc2hAZ21haWwuY29tIiwiaWF0IjoxNzUyNzQ3MDQ4LCJleHAiOjE3NTI3NTA2NDh9.mx2ED_s_FNAphRFHXKlDeoSZfaEITJihlSnghNrLdvw",
            }),
          }),
        },
      },
    },
    404: {
      description: "no attendee in database",
      content: {
        "application/json": {
          schema: ResponseSchema.pick({ message: true }),
        },
      },
    },
  },
});

Register.registerPath({
  method: "post",
  path: "/event/create",
  summary: "create a Event with venueId",
  description: "create a vent with venueid to create event",
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: createEventSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "the event created schema",
      content: {
        "application/json": {
          schema: ResponseSchema.pick({ message: true }).extend({
            data: createEventSchemaSuccess,
          }),
        },
      },
    },
  },
});

Register.registerPath({
  method: "put",
  path: "/event/update/{id}",
  summary: "update the Event",
  description: "the api is used to update the event in the database",
  security: [{ bearerAuth: [] }],
  request: {
    params: idValidateSchema,
    body: {
      content: {
        "application/json": {
          schema: updateEventSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "the updated event",
      content: {
        "application/json": {
          schema: ResponseSchema.pick({ message: true }).extend({
            data: createEventSchemaSuccess,
          }),
        },
      },
    },
  },
});
