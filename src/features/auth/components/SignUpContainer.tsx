import { useState } from "react";
import { CredientialsForm } from "./CredentialsForm";
import { OTPForm } from "./OTPForm";

type SignUpStep = "credentials" | "otp";

export function SignUpContainer() {
  const [step, setStep] = useState<SignUpStep>("credentials");
  const [userEmail, setUserEmail] = useState({ email: "", maskedEmail: "" });

  const handleChangeStep = ({
    email,
    maskedEmail,
  }: {
    email: string;
    maskedEmail: string;
  }) => {
    // Email is passed up from CredentialsForm
    setUserEmail({ email, maskedEmail });
    setStep("otp");
  };

  return (
    <div>
      {step === "credentials" ? (
        <CredientialsForm changeStep={handleChangeStep} />
      ) : (
        <OTPForm email={userEmail.email} maskedEmail={userEmail.maskedEmail} />
      )}
    </div>
  );
}
