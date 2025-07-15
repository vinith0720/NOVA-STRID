import { z } from "zod";
import { idValidate } from "./event.dto.js";

export const createEventAttendeSchema = z.object({
  eventId: idValidate,
  attendeeId: idValidate,
});

export const updateEventAttendeSchema = createEventAttendeSchema.partial();

export type EventAttendeUpdateInput = z.infer<typeof updateEventAttendeSchema>;

export type EventAttendeCreateInput = z.infer<typeof createEventAttendeSchema>;
