import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .transform((val) => val.trim().toLowerCase()),
  password: z
    .string()
    .min(8, { message: "Provide minimum 8 characters for password" }),
  role: z
    .string()
    .min(1, { message: "Role must not be empty if provided" })
    .optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
