import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";
import React from "react";
import z from "zod";

const sendMailSchema = z.object({
  to: z.array(z.email()),
  subject: z.string(),
  react: z.custom<React.ReactNode>(),
});

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = createServerFn({ method: "POST" })
  .inputValidator(sendMailSchema)
  .handler(async ({ data: { react, subject, to } }) => {
    try {
      const emailOptions: Parameters<typeof resend.emails.send>[0] = {
        from:
          process.env.RESEND_EMAIL_FROM ||
          "PhishingHook <onboarding@resend.dev>",
        to,
        subject,
        react,
      };

      return await resend.emails.send(emailOptions);
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(`Caught Error: ${e.message}`);
      }

      throw new Error(`Unexpected: ${e}`);
    }
  });
