import { z } from "@utils/zod.js";

import { idValidate } from "./event.dto.js";

export const createEventAttendeSchema = z
  .object({
    eventId: idValidate,
    attendeeId: idValidate,
  })
  .openapi({ description: "attende create schema" });

export const updateEventAttendeSchema = createEventAttendeSchema.partial();

export type EventAttendeUpdateInput = z.infer<typeof updateEventAttendeSchema>;

export type EventAttendeCreateInput = z.infer<typeof createEventAttendeSchema>;
