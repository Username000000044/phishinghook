
import { authClient } from "./auth-client";
import { toast } from "sonner";
export type UserOTP = {
  email: string;
  otp: string;
};

export const verifyUserOTP = async ({ email, otp }: UserOTP) => {
  return await authClient.emailOtp.checkVerificationOtp({
    email,
    otp,
    type: "email-verification",
    fetchOptions: {
      onError(ctx) {
        toast.error(ctx.error.message);
      },
    },
  });
};
