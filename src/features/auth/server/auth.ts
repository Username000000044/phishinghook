import { APIError, betterAuth } from "better-auth";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@db/index";
import * as schema from "@/features/auth/schemas/auth.sql";
import { emailOTP, oneTap, organization } from "better-auth/plugins";
import { sendEmail } from "@/lib/mail";
import { OTPEmailTemplate } from "../components/OTPEmailTemplate";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.VITE_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [
    oneTap(),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "email-verification") {
          await sendEmail({
            data: {
              to: [email],
              subject: "Account verification OTP",
              react: OTPEmailTemplate({ email, otp }),
            },
          });
        }
      },
      sendVerificationOnSignUp: true,
    }),
    organization(),
    tanstackStartCookies(),
  ],
  // hooks: {
  //   after: createAuthMiddleware(async (ctx) => {
  //     if (ctx.path.startsWith("/sign-up")) {
  //       const newSession = ctx.context.newSession;
  //       if (newSession) {
  //         try {
  //           await auth.api.createOrganization({
  //             body: {
  //               name: "Personal", // required
  //               slug: `${newSession.user.id}-personal`, // required
  //               // logo: "https://example.com/logo.png",
  //               // metadata,
  //               userId: newSession.user.id,
  //               keepCurrentActiveOrganization: false,
  //             },
  //           });
  //         } catch (error) {
  //           if (error instanceof APIError) {
  //             throw new APIError(error.status, {
  //               message: error.message,
  //             });
  //           }

  //           throw new Error(`Unexpected: ${error}`);
  //         }

  //         // sendMessage({
  //         //     type: "user-register",
  //         //     name: newSession.user.name,
  //         // })
  //       }
  //     }
  //   }),
  // },
});
