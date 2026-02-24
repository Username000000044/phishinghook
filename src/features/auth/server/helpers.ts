import { createServerFn } from "@tanstack/react-start";

export const maskEmail = createServerFn() //AI
  .inputValidator((email: string) => email)
  .handler(async ({ data: email }) => {
    if (!email || !email.includes("@")) return email;

    const [localPart, domain] = email.split("@");

    // Handle very short usernames
    if (localPart.length <= 2) {
      return `****@${domain}`;
    }

    const firstChar = localPart[0];
    const lastChar = localPart[localPart.length - 1];

    return `${firstChar}****${lastChar}@${domain}`;
  });
