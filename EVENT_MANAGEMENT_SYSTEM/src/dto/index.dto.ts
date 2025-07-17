import { z } from "@utils/zod.js";

export const ResponseSchema = z
  .object({
    message: z.string(),
    errors: z
      .any()
      .optional()
      .openapi({ description: "only error occur the errors are there" }),
    data: z.any().optional().openapi({ description: "you get a data from " }),
  })
  .openapi({ description: "Response" });

export type Responsetype = z.infer<typeof ResponseSchema>;
