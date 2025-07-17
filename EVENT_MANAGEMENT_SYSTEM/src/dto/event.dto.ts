import { z } from "@utils/zod.js";

export const idValidate = z.uuid().openapi({
  description: "ID (UUID string)",
  example: "e44e1df0-d80c-403b-bcaa-cd7044873968",
});
export const idValidateSchema = z.object({
  id: idValidate,
});

export const createEventSchema = z
  .object({
    title: z
      .string()
      .min(3, "Provide a title with minimum 3 characters")
      .openapi({
        description: "Title of the event",
        example: "Annual Tech Conference",
      }),

    description: z
      .string()
      .min(3, "Provide a description with minimum 3 characters")
      .optional()
      .openapi({
        description: "Short description of the event",
        example: "A meetup for software engineers and tech enthusiasts",
      }),

    venueId: z.string().min(16, "Provide valid UUID").openapi({
      description: "Venue ID (UUID string)",
      example: "e44e1df0-d80c-403b-bcaa-cd7044873968",
    }),

    date: z
      .string()
      .transform((val) => new Date(val))
      .openapi({
        description: "Date and time of the event (ISO format)",
        example: "2025-08-01T10:30:00Z",
        format: "date-time",
      }),
  })
  .openapi({
    description: "Schema for creating a new event",
  });

export const createEventSchemaSuccess = createEventSchema
  .extend({
    id: z.string().min(16, "Provide valid UUID").openapi({
      description: "Event ID (UUID string)",
      example: "e44e1df0-d80c-403b-bcaa-cd7044873968",
    }),
    createdAt: z.date().openapi({
      description: "Date and time of the event (ISO format)",
      example: "2025-08-01T10:30:00Z",
      format: "date-time",
    }),
    updatedAt: z.date().openapi({
      description: "Date and time of the event (ISO format)",
      example: "2025-08-01T10:30:00Z",
      format: "date-time",
    }),
  })
  .openapi({ description: "Shema for event Response" });

export const updateEventSchema = createEventSchema.partial();

export type EventUpdateInput = z.infer<typeof updateEventSchema>;

export type EventCreateInput = z.infer<typeof createEventSchema>;
