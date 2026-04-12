import { authClient } from "@/features/auth/client/auth-client";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

export const useSignOut = () => {
  const router = useRouter();
  const queryClient = useQueryClient()

  const signOut = async () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['session'] })
      },
    });
  };

  return signOut;
};
