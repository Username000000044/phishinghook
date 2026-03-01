import { authClient } from "@/features/auth/client/auth-client"
import { auth } from "@/features/auth/server/auth"
import { createIsomorphicFn } from "@tanstack/react-start"
import { getRequestHeaders } from "@tanstack/react-start/server";


export const isAuthenticated = createIsomorphicFn()
    .client(async () => {
        const { data: session } = authClient.useSession()
        return Boolean(session)
    })
    .server(async () => {
        const session = await auth.api.getSession({
            headers: getRequestHeaders()
        })
        return Boolean(session)
    })

    
