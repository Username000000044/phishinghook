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
import { UserOTP, verifyUserOTP } from "../client/helpers";

export function OTPForm({ email }: Pick<UserOTP, "email">) {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      otp: "",
    },
    validators: {
      // onChangeAsync: async ({ value: { otp } }) => {
      //   if (otp.length === 6) {
      //     const { error } = await verifyUserOTP({ email, otp });
      //     if (error)
      //       return {
      //         fields: {
      //           email: "OTP is not correct, please try again.",
      //         },
      //       };
      //     return undefined;
      //   }
      // },
    },
    onSubmit: async () => {
      await navigate({ to: "/dashboard" });
    },
  });

  // const handleMask = async (email: string) => {
  //   return await maskEmail({ data: email });
  // };

  return (
    <Card className="bg-transparent border-none p-0">
      <CardHeader className="text-center p-0 space-y-2">
        <CardTitle className="text-3xl">OTP Verification</CardTitle>
        <CardDescription className="text-muted-foreground">
          To verify your account, enter OTP code sent to:
          <span className="block">[{email || "Unknown Email"}]</span>
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
          <form.Field name="otp">
            {/* data from parent is auto passed down as a prop named children */}
            {(field) => {
              const errors = field.state.meta.errors;
              const isInvalid = !!(field.state.meta.isTouched && errors.length);

              return (
                <>
                  {/* <FieldLabel htmlFor="digits-only">Digits Only</FieldLabel> */}
                  <div
                    className="flex flex-col items-center my-5"
                    data-invalid={isInvalid}
                  >
                    <InputOTP
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS}
                      // Form details
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e)}
                      data-invalid={isInvalid}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
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
        </form>
      </CardContent>
      <CardFooter className="flex flex-col text-center w-full p-0">
        <div className="flex gap-1  text-sm">
          <p className="text-muted-foreground">Didn't recieve the OTP code? </p>
          <div className="cursor-pointer hover:underline">Resend</div>
        </div>
      </CardFooter>
    </Card>
  );
}
