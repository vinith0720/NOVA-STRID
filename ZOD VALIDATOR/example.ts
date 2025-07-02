import { z, ZodError } from "zod";

const UserSchema = z.object({
  name: z.string(),
  age: z.number().int().positive(),
  email: z
    .string()
    .email()
    .transform((val) => val.toLowerCase()),
  isAdmin: z.boolean().optional(),
});

type User = z.infer<typeof UserSchema>;

const data: User = {
  name: "Vinith",
  age: 10,
  email: "VINITH@example.com",
};

// try {
//   const result = UserSchema.safeParse(data);
//   console.log("RESULT : ", result);
// } catch (error) {
//   if (error instanceof ZodError) {
//     console.log(error);
//   }
//   //   console.log(error);
// }

const result = UserSchema.safeParse(data);
if (!result.success) {
  console.error(result.error);
} else {
  console.log(result); // fully typed!
}

// type USERQ = z.output<typeof UserSchema>;
