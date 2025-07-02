import { z } from "zod";
import {
  OpenAPIRegistry,
  extendZodWithOpenApi,
} from "@asteasolutions/zod-to-openapi";
extendZodWithOpenApi(z);
import { createBookValidate } from "../middleware/zod.validate";

export const BookRegister = new OpenAPIRegistry();

BookRegister.register("createBookValidate", createBookValidate);

BookRegister.registerPath({
  method: "post",
  path: "/book",
  summary: "Create a book",
  description: "It returns the created book",
  request: {
    body: {
      content: {
        "application/json": {
          schema: createBookValidate.openapi("createBookValidate"),
        },
      },
    },
  },
  responses: {
    200: {
      description: "Book created successfully",
      content: {
        "application/json": {
          schema: createBookValidate
            .extend({ id: z.number() })
            .openapi("bookdata"),
        },
      },
    },
  },
});
