import { z, ZodError } from "zod/v4";

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

const data = {
  name: "Vinith",
  age: "10",
  // email: "VINITH@example.com",
};

const result = UserSchema.safeParse(data);

if (!result.success) {
  const err = z.formatError(result.error);
  console.log(err);
} else {
  console.log(result);
}

// try {
//   const result = UserSchema.safeParse(data);
//   console.log("RESULT : ", result);
// } catch (error) {
//   if (error instanceof ZodError) {
//     console.log(error);
//   }
//   //   console.log(error);
// }

// type USERQ = z.output<typeof UserSchema>;

// const nullishYoda = z.literal("yoda").nullable();

// nullishYoda.safeParse("vinith");

// const result = nullishYoda.safeParse(undefined);
// if (!result.success) {
//   console.error(result.error.flatten());
// } else {
//   console.log(result); // fully typed!
// }

// const Recipe = z.object({
//   title: z.string().optional(),
//   description: z.string().optional(),
//   ingredients: z.array(z.string()),
// });

// const data = Recipe.required({ title: true });

// const MyResult = z.discriminatedUnion("status", [
//   z.object({ status: z.literal("success"), data: z.string() }),
//   z.object({ status: z.literal("failed"), error: z.string() }),
// ]);

// const Person = z.object({ name: z.string() });
// type Person = z.infer<typeof Person>;

// const Employee = z.object({ role: z.string() });
// type Employee = z.infer<typeof Employee>;

// const EmployedPerson = z.intersection(Person, Employee);
// type EmployedPerson = z.infer<typeof EmployedPerson>;
// // Person & Employee
const myRegistry = z.registry();

myRegistry.add(z.string());
myRegistry.add(z.number());
