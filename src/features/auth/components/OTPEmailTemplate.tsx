interface OTPEmailTemplateProps {
  email: string;
  otp: string;
}

export function OTPEmailTemplate({ email, otp }: OTPEmailTemplateProps) {
  return (
    <div>
      <p>Hello,</p>
      <p>
        A one-time password (OTP) has been requested for your account associated
        with the email address: {email}.
      </p>
      <p>
        Your OTP is: <strong>{otp}</strong>
      </p>
      <p>Please use this code to complete your verification process.</p>
      <p>If you did not request this code, please ignore this email.</p>
      <p>Thank you,</p>
      <p>Phishing Hook Team</p>
    </div>
  );
}
