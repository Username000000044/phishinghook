import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldError } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useForm } from "@tanstack/react-form";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useNavigate } from "@tanstack/react-router";
import { authClient } from "../client/auth-client";
import { toast } from "sonner";

export function OTPForm({
  email,
  maskedEmail,
}: {
  email: string;
  maskedEmail: string;
}) {
  const navigate = useNavigate();
  const OTP_MAX = 6;

  const form = useForm({
    defaultValues: {
      otp: "",
    },
    validators: {
      onChange: ({ value: { otp } }) => {
        if (otp.length !== OTP_MAX) return;

        form.handleSubmit();
      },
    },
    onSubmit: async ({ value: { otp } }) => {
      await authClient.emailOtp.verifyEmail({
        email, // required
        otp, // required
        fetchOptions: {
          async onSuccess() {
            await navigate({ to: "/dashboard" });
          },
          onError(context) {
            const error = context.error;
            if (error.code === "INVALID_OTP") {
              form.setFieldMeta("otp", (prev) => ({
                ...prev,
                errorMap: {
                  ...prev.errorMap,
                  onSubmit: error.message,
                },
              }));
            } else if (error.code === "TOO_MANY_ATTEMTPS") {
              toast.error("Too many attempts. Try again in a few seconds.");
            } else {
              toast.error(
                "OTP could not be verified. Try again in a few seconds.",
              );
              throw new Error(`Unexpected: ${error}`);
            }
          },
          onRequest() {},
          onResponse() {},
        },
      });
    },
  });

  const handleResend = async () => {
    await authClient.emailOtp.sendVerificationOtp({
      email, // required
      type: "email-verification", // required
      fetchOptions: {
        async onSuccess() {
          toast.success("Resent OTP verification code.");
        },
        onError(context) {
          const error = context.error;

          if (error.code === "TOO_MANY_ATTEMTPS") {
            toast.error("Too many attempts. Try again in a few seconds.");
          } else {
            toast.error(
              "Verification code could not be resent. Try again in a few seconds.",
            );
          }
          throw new Error(`Unexpected: ${context.error}`);
        },
      },
    });
  };

  return (
    <Card className="bg-transparent border-none p-0">
      <CardHeader className="text-center p-0 space-y-2">
        <CardTitle className="text-5xl text-primary">
          OTP Verification
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          To verify your account, enter OTP code sent to:
          <span className="block">[{maskedEmail || "Unknown Email"}]</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <form
          id="sign-in-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.Subscribe
            selector={(state) => state.isSubmitting}
            children={(isSubmitting) => (
              <form.Field name="otp">
                {/* data from parent is auto passed down as a prop named children */}
                {(field) => {
                  const errors = field.state.meta.errors;
                  const isInvalid = !!(
                    field.state.meta.isTouched && errors.length
                  );

                  return (
                    <>
                      {/* <FieldLabel htmlFor="digits-only">Digits Only</FieldLabel> */}
                      <div
                        className="flex flex-col items-center my-5"
                        data-invalid={isInvalid}
                      >
                        <InputOTP
                          maxLength={OTP_MAX}
                          pattern={REGEXP_ONLY_DIGITS}
                          // Form details
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e)}
                          data-invalid={isInvalid}
                          disabled={isSubmitting}
                        >
                          <InputOTPGroup className="!bg-foreground text-secondary rounded-md">
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup className="!bg-foreground text-secondary rounded-md">
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                        {isInvalid && <FieldError>{errors}</FieldError>}
                      </div>
                    </>
                  );
                }}
              </form.Field>
            )}
          ></form.Subscribe>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col text-center w-full p-0">
        <div className="flex gap-1  text-sm">
          <p className="text-muted-foreground">Didn't recieve the OTP code? </p>
          <button
            onClick={handleResend}
            className="cursor-pointer hover:underline"
          >
            Resend
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}
