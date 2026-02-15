import { createAuthClient } from 'better-auth/react'
import { oneTapClient, emailOTPClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    baseURL: import.meta.env.BETTER_AUTH_URL,
    plugins: [
        emailOTPClient(),
        oneTapClient({
            clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID as string,
            autoSelect: false,
            cancelOnTapOutside: true,
            context: "signin",
        })
    ]
})
