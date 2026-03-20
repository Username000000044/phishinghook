import { authClient } from "@/features/auth/client/auth-client";
import { auth } from "@/features/auth/server/auth";
import type { RegisteredRouter, Router } from '@tanstack/react-router';
import { createMiddleware, createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

export const isAuthenticated = async () => {
    const session = await authClient.getSession()
    return !!session.data;
}

export const getSession = createServerFn({ method: "GET" }).handler(async () => {
    const headers = getRequestHeaders();
    const session = await auth.api.getSession({ headers });

    return session;
});

export const ensureSession = createServerFn({ method: "GET" }).handler(async () => {
    const headers = getRequestHeaders();
    const session = await auth.api.getSession({ headers });

    if (!session) {
        throw new Error("Unauthorized");
    }

    return session;
});

export const signOutUser = async (router: RegisteredRouter) => {
        
    await authClient.signOut({
        fetchOptions: {
            onSuccess: () => {
                router.navigate({ to: "/" });
                router.invalidate();
            }
        }
    });
}


