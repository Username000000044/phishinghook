import { betterAuth } from 'better-auth'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { oneTap } from "better-auth/plugins"; 
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@db/index"
import * as schema from "@/features/auth/schemas/auth.sql"

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  advanced: {
    cookiePrefix: "ph"
  },
  socialProviders: {
        google: { 
            clientId: process.env.VITE_GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIfENT_SECRET as string, 
        }, 
    },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [oneTap(), tanstackStartCookies()],
});
