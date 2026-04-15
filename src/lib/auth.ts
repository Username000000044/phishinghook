import { auth } from "@/features/auth/server/auth";
import { queryOptions } from "@tanstack/react-query";

import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

export const fetchSession = createServerFn({ method: "GET" }).handler(
  async () => {
    const headers = getRequestHeaders();
    const session = await auth.api.getSession({ headers });

    return session;
  },
);

export const sessionQueryOptions = queryOptions({
  queryKey: ["session"],
  queryFn: async () => fetchSession(),
  staleTime: Infinity,
});

export const protectedSessionQueryOptions = queryOptions({
  queryKey: ["session"],
  queryFn: async () => {
    const session = await fetchSession();
    if (!session) throw new Error("Unauthorized");
    return session;
  },
  staleTime: Infinity,
});

export const ensureSession = createServerFn({ method: "GET" }).handler(
  async () => {
    const headers = getRequestHeaders();
    const session = await auth.api.getSession({ headers });

    if (!session) {
      throw new Error("Unauthorized");
    }

    return session;
  },
);
