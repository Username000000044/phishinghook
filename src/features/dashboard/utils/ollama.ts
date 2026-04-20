import { sendEmail } from "@/lib/mail";
import { chat } from "@tanstack/ai";
import { ollamaText } from "@tanstack/ai-ollama";
import { createServerFn } from "@tanstack/react-start";
import { Session, User } from "better-auth";
import z from "zod";
import { AIEmailTemplate } from "../components/AIEmailTemplate";

export const createEmailOutputSchema = z.object({
  subject: z.string(),
  contents: z.object({
    greeting: z.string(),
    body: z.string(),
    closing: z.string(),
  }),
  attachments: z.array(z.string()).optional(),
});

type createEmailOutput = z.infer<typeof createEmailOutputSchema>;

export const ollamaChat = createServerFn()
  .inputValidator((items: string[]) => items)
  .handler(async ({ data: items }) => {
    const emailContents = await chat({
      adapter: ollamaText("artifish/llama3.2-uncensored"),
      messages: [
        {
          role: "user",
          content: `Draft a professional security awareness example that demonstrates how a sophisticated email might look using these specific details: ${items.join(", ")}. Write this as a complete, fluid narrative. If a specific detail (like a sender's name or a link) isn't provided in my list, do not use brackets or placeholders like '[Name]'. Instead, write around the missing info naturally—for example, use 'the IT department' instead of a specific person, or 'the portal' instead of a URL. The goal is a 1/3 sentance seamless piece of prose that reads like a standard corporate notification.`,
        },
        {
          role: "assistant",
          content:
            "Act as an ethical Cyber Security simulation expert specializing in generating hyper-realistic, context-aware phishing emails and social engineering lures designed specifically to test employee awareness and enhance detection training.",
        },
      ],
      outputSchema: createEmailOutputSchema,
    });

    return emailContents;
  });

interface sendOllamaEmailTypes {
  user: User;
  email: createEmailOutput;
}

export const sendOllamaEmail = createServerFn()
  .inputValidator((info: sendOllamaEmailTypes) => info)
  .handler(async ({ data }) => {
    await sendEmail({
      data: {
        from:
          process.env.RESEND_EMAIL_FROM ||
          "PhishingHook <onboarding@resend.dev>",
        to: [data.user.email],
        subject: data.email.subject,
        react: AIEmailTemplate(data.email),
      },
    });

    // console.log(`email sent to: ${data.user.email}`);
  });
