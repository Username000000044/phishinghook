import { createAuthClient } from 'better-auth/react'
import { emailOTPClient, oneTapClient, organizationClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    plugins: [
        organizationClient(),
        emailOTPClient(),
        oneTapClient({
            clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID as string,
            autoSelect: false,
            cancelOnTapOutside: true,
            context: "signin",
        })
    ]
})

export type Session = typeof authClient.$Infer.Session