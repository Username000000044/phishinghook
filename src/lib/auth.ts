import { authClient } from "@/features/auth/client/auth-client";
import { auth } from "@/features/auth/server/auth";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

export const getSessionFn = createIsomorphicFn()
  .client(async () => {
    const { data: session } = authClient.useSession();
    return session;
  })
  .server(async () => {
    const headers = getRequestHeaders();
    const session = await auth.api.getSession({ headers });
    return session;
  });
