import { createAuthClient } from 'better-auth/react'
import { emailOTPClient, oneTapClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
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
