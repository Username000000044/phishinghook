import { betterAuth } from 'better-auth'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { Pool } from 'pg';
import { oneTap } from "better-auth/plugins"; 

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  socialProviders: {
        google: { 
            clientId: process.env.VITE_GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [oneTap(), tanstackStartCookies()],
});
