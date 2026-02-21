import { useState } from "react";
import { CredientialsForm } from "./CredentialsForm";
import { OTPForm } from "./OTPForm";

type SignUpStep = "credentials" | "otp";

export function SignUpContainer() {
  const [step, setStep] = useState<SignUpStep>("credentials");
  const [userEmail, setUserEmail] = useState("");

  const handleSignUpSuccess = (email: string) => {
    // Email is passed up from CredentialsForm
    setUserEmail(email);
    setStep("otp");
  };

  return (
    <div>
      {step === "credentials" ? (
        <CredientialsForm onSuccess={handleSignUpSuccess} />
      ) : (
        <OTPForm email={userEmail} />
      )}
    </div>
  );
}
