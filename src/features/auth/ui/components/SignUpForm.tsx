import { useForm } from "@tanstack/react-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { GoogleOneTap } from "./GoogleOneTap";
import { AuthField } from "./AuthField";
import { signUpSchema } from "../../schemas/auth.schema";
import { isEmailTaken, sendOTP, signUp } from "../../server/actions";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { Dispatch, SetStateAction } from "react";
import { StepType } from "../SignUpPage";

type ChildProps = {
  setCurrentStep: Dispatch<SetStateAction<StepType>>;
  currentStep: string;
};

export function SignUpForm({ setCurrentStep, currentStep }: ChildProps) {
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    validators: {
      onSubmit: signUpSchema,
      onSubmitAsync: async ({ value }) => {
        const email = await isEmailTaken({ data: value.email });

        if (email.exists)
          return {
            fields: {
              email: "This email is already in use",
            },
          };

        return undefined;
      },
    },
    onSubmit: async ({ value }) => {
      try {
        // 1. Enter User into DB
        await signUp(value);

        // 2. Verify User Email Using OTP
        const otp = await sendOTP({ data: value });
        if (otp?.success) setCurrentStep("otp"); // If OTP sent successfully, change stage to OTP

        // 3.
        //
        //
      } catch (error) {
        // Better Auth errors should be handled within the each async function ^.
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error(`An unknown error occured:`, error);
        }
      }
    },
  });

  return (
    <Card className="bg-transparent border-none p-0">
      <CardHeader className="text-center p-0 space-y-2">
        <CardTitle className="text-2xl">Sign Up for PhishHook</CardTitle>
        <CardDescription className="text-muted-foreground">
          Welcome to PhishHook, please enter sign up details and verify your
          email to use the app.
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
          <FieldGroup className="gap-0 space-y-4">
            <form.Field name="username">
              {/* data from parent is auto passed down as a prop named children */}
              {(field) => (
                <AuthField
                  field={field}
                  placeholder="Username"
                  autoComplete="name"
                />
              )}
            </form.Field>
            <form.Field name="email">
              {(field) => (
                <AuthField
                  field={field}
                  placeholder="Email"
                  autoComplete="email"
                />
              )}
            </form.Field>
            <form.Field name="password">
              {(field) => (
                <AuthField
                  field={field}
                  type="password"
                  placeholder="Password"
                  autoComplete="new-password"
                />
              )}
            </form.Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col text-center w-full p-0 space-y-6">
        <form.Subscribe
          selector={(state) => state.isSubmitting}
          children={(isSubmitting) => (
            <Field>
              <Button
                type="submit"
                form="sign-in-form"
                className="cursor-pointer"
                disabled={isSubmitting}
              >
                <LoadingSwap isLoading={isSubmitting}>Sign Up</LoadingSwap>
              </Button>
            </Field>
          )}
        ></form.Subscribe>

        <div className="flex justify-center items-center gap-5 w-full">
          <hr className="bg-muted w-full h-[1px]" />
          <p className="text-xs text-muted">OR</p>
          <hr className="bg-muted w-full h-[1px]" />
        </div>

        <GoogleOneTap />
      </CardFooter>
    </Card>
  );
}
