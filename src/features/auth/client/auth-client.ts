import { createAuthClient } from 'better-auth/react'
import { oneTapClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    plugins: [
        oneTapClient({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            autoSelect: false,
            cancelOnTapOutside: true,
        })
    ]
})
