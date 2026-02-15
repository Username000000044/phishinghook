import { db } from "@/db";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { user } from "../schemas/auth.sql";

export const isEmailTaken = createServerFn({ method: "GET"})
  .inputValidator((email:string) => email)
  .handler(async ({ data: email }) => {
    const userQuery = await db.query.user.findFirst({
      where: eq(user.email, email)
    });
    return !!userQuery; // true if user exists
  });