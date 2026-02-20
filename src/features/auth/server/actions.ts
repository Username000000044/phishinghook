import { db } from "@/db";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { user } from "../schemas/auth.sql";
import { SignUpInput } from "../schemas/auth.schema";
import { authClient } from "../client/auth-client";
import defaultProfile from "/brand/default-profile.png";
import { toast } from "sonner";
import { auth } from "./auth";
import { getRequestHeaders } from "@tanstack/react-start/server";

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

export const signUp = async ({ email, username, password }: SignUpInput) => {
  await authClient.signUp.email({
    email,
    password,
    name: username,
    image: defaultProfile, // Default user profile image
    fetchOptions: {
      onSuccess(context) {
        toast.success("Check email to verfy your account!");
      },
      onError(context) {
        toast.error(context.error.message);
      },
    },
  });
};
