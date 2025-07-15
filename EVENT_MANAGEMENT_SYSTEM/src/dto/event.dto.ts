import { z } from "zod";

export const idValidate = z.uuid({ message: "Provide valid UUID" });
export const idValidateSchema = z.object({
  id: idValidate,
});
export const createEventSchema = z.object({
  title: z.string().min(3, "provide a title with minimum 3 character"),
  description: z
    .string()
    .min(3, "provide a description with minimum 3 character")
    .optional(),
  venueId: z.string().min(16, "provide valid uuid"),
  date: z.string().transform((val) => new Date(val)),
});

export const updateEventSchema = createEventSchema.partial();

export type EventUpdateInput = z.infer<typeof updateEventSchema>;

export type EventCreateInput = z.infer<typeof createEventSchema>;
