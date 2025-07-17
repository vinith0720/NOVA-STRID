import { z } from "@utils/zod.js";

export const createAttendeSchema = z.object({
  name: z.string().min(3, "provide a name with minimum 3 character"),
  email: z.email().transform((x) => x.toLocaleLowerCase()),
});
// .openapi({ description: "Attendee Create and login" });

export const updateAttendeSchema = createAttendeSchema.partial();

export type AttendeeUpdateInput = z.infer<typeof updateAttendeSchema>;

export type AttendeeCreateInput = z.infer<typeof createAttendeSchema>;

export type GetAttendeeInput =
  | { id: string; email?: never }
  | { email: string; id?: never };
