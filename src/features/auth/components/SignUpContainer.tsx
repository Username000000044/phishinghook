import { useState } from "react";
import { CredientialsForm } from "./CredentialsForm";
import { OTPForm } from "./OTPForm";
import { authClient } from "../client/auth-client";

type SignUpStep = "credentials" | "otp";

export function SignUpContainer() {
  const [step, setStep] = useState<SignUpStep>("credentials");
  const [userEmail, setUserEmail] = useState("");

  const handleSignUpSuccess = (email: string) => {
    // Email is passed up from CredentialsForm
    setUserEmail(email);
    setStep("otp");
  };

  const { data: session } = authClient.useSession();
  const verified = session?.user.emailVerified;

  return (
    <div>
      {step === "credentials" && !verified ? (
        <CredientialsForm onSuccess={handleSignUpSuccess} />
      ) : (
        <OTPForm email={userEmail} />
      )}
    </div>
  );
}
