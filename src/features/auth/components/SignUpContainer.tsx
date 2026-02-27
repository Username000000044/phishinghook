import { useState } from "react";
import { CredientialsForm } from "./CredentialsForm";
import { OTPForm } from "./OTPForm";

type SignUpStep = "credentials" | "otp";

export function SignUpContainer() {
  const [step, setStep] = useState<SignUpStep>("credentials");
  const [userEmail, setUserEmail] = useState("");

  const handleChangeStep = (email: string) => {
    // Email is passed up from CredentialsForm
    setUserEmail(email);
    setStep("otp");
  };

  return (
    <div>
      {step === "credentials" ? (
        <CredientialsForm changeStep={handleChangeStep} />
      ) : (
        <OTPForm email={userEmail} />
      )}
    </div>
  );
}
