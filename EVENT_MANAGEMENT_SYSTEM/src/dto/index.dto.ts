import { z } from "zod";
export const ResponseSchema = z.object({
  message: z.string(),
  errors: z.any().optional(),
  data: z.any().optional(),
});
// .openapi({ description: "the Response Shema" });

export type Responsetype = z.infer<typeof ResponseSchema>;
