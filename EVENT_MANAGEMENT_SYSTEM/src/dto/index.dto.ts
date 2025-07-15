import { z } from "zod/v4";
export const ErrorResponseSchema = z.object({
  message: z.string(),
  errors: z.any().optional(),
  data: z.any().optional(),
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
