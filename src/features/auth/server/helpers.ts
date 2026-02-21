import { db } from "@/db";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { user } from "../schemas/auth.sql";
import { SignUpInput } from "../schemas/auth.schema";
import { auth } from "./auth";

export const isEmailTaken = createServerFn({ method: "GET" })
  .inputValidator((email: string) => email)
  .handler(async ({ data: email }) => {
    
    const userQuery = await db.query.user.findFirst({
      where: eq(user.email, email),
    });
    return { exists: !!userQuery }; // true if user exists
  });

export const sendOTP = createServerFn({ method: "POST" })
  .inputValidator((value: SignUpInput) => value)
  .handler(async ({ data: value }) => {
    const data = await auth.api.sendVerificationOTP({
      body: {
        email: value.email, // required
        type: "email-verification", // required
      },
    });

    if (data) return { success: true };
  });
