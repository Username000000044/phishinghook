import { authClient } from "@/features/auth/client/auth-client";
import { useRouter } from "@tanstack/react-router";

export const useSignOut = () => {
  const router = useRouter();

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.navigate({ to: "/" });
          router.invalidate();
        },
      },
    });
  };

  return signOut;
};
