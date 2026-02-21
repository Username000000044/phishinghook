import { toast } from "sonner";
import { SignUpInput } from "../schemas/auth.schema";
import { authClient } from "./auth-client";
import defaultProfile from "/brand/default-profile.png";


export const signUp = async ({ email, username, password }: SignUpInput) => {
  await authClient.signUp.email({
    email,
    password,
    name: username,
    image: defaultProfile, // Default user profile image
    fetchOptions: {
      onSuccess(context) {
        toast.success("Check email to verfy your account!");
      },
      onError(context) {
        toast.error(context.error.message);
      },
    },
  });
};