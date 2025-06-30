import { z, ZodSchema } from "zod";

export const createBookValidate = z.object({
  title: z.string(),
  author: z.string(),
});

export const pagination = z.object({
  limit: z.number(),
  offset: z.number(),
});

type page = z.infer<typeof pagination>;
