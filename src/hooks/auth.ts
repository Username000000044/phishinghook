import { authClient } from "@/features/auth/client/auth-client";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";

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
