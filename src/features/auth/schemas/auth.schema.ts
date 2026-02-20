import z from "zod";

// Login Schema
export const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(128, "Password exceeds 128 character limit."),
});

// Signup Schema
export const signUpSchema = z.object({
  username: z
    .string()
    .min(3 , "Username must be atleast 3 characters.")
    .max(35, "Username exceeds 35 character limit")
    .regex(/^[A-Za-z0-9 _-]*$/, "Only (a-z, 0-9, _,-) characters supported."),
  email: z.email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(128, "Password exceeds 128 character limit."),
});

export type LoginInput = z.infer<typeof loginSchema>
export type SignUpInput = z.infer<typeof signUpSchema>
