import { authClient } from "@/features/auth/client/auth-client";
import { useRouter } from "@tanstack/react-router";

export const useSignOut = () => {
  const router = useRouter();

  const signOut = async () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: async () => {
          await router.invalidate();          
        },
      },
    });
  };

  return signOut;
};
