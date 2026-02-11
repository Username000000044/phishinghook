import z from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(128, "Password exceeds 128 character limit."),
});

export type LoginInput = z.infer<typeof loginSchema>