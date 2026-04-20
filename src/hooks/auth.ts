import { authClient } from "@/features/auth/client/auth-client";
import { useQueryClient } from "@tanstack/react-query";
import { useRouteContext, useRouter } from "@tanstack/react-router";

export const useSignOut = () => {
  const queryClient = useQueryClient();
  const route = useRouter();

  const signOut = async () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: async () => {
          queryClient.invalidateQueries({ queryKey: ["session"] });
          route.invalidate();
        },
      },
    });
  };

  return signOut;
};

export function useSession() {
  return useRouteContext({ from: "__root__" }).session;
}

export function useRequiredSession() {
  const session = useSession();
  if (!session) throw new Error("Session missing in protected route");
  return session;
}
