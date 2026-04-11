import { useForm } from "@tanstack/react-form";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { AuthField } from "./ui/AuthField";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { signUpSchema } from "../schemas/auth.schema";
import { authClient } from "../client/auth-client";
import { maskEmail } from "../server/utils";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";

interface FormProps {
  changeStep: ({
    email,
    maskedEmail,
  }: {
    email: string;
    maskedEmail: string;
  }) => void;
}

export function SignUpForm({ changeStep }: FormProps) {
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    validators: {
      onSubmit: signUpSchema,
    },
    onSubmit: async ({ value: { username, email, password } }) => {
      await authClient.signUp.email({
        name: username,
        email,
        password,
        // image: `${import.meta.env.VITE_APP_URL}/brand/default-profile.png`,
        fetchOptions: {
          async onSuccess(context) {
            // Send OTP
            toast.success("Check your email to verify your account!");
            // Mask Email and change UI to OTP comopnet
            const maskedEmail = await maskEmail({ data: email });

            changeStep({ email, maskedEmail });
          },
          onError(context) {
            const error = context.error;
            if (error.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
              return form.setFieldMeta("email", (prev) => ({
                ...prev,
                errorMap: {
                  ...prev.errorMap,
                  onSubmit: error.message,
                },
              }));
            } else {
              toast.error(
                "Verification could not be sent. Try to send it again in a few seconds.",
              );
              throw new Error(`Unexpected: ${error}`);
            }
          },
          // onRequest(context) {},
          // onResponse(context) {},
        },
      });
    },
  });

  return (
    <Card className="bg-transparent border-none p-0 m-0 w-full">
      <CardHeader className="p-0 text-muted">
        <CardTitle className="text-4xl text-primary">SIGN UP</CardTitle>
        <CardDescription className="text-muted text-lg">
          Enter your <span className="underline decoration-wavy">secure</span>{" "}
          credentials to access the phishing hook app.
        </CardDescription>
        <CardAction>
          <Button
            size="xs"
            variant="secondary"
            className="cursor-pointer text-muted-foreground"
            asChild
          >
            <Link to="/login">log in</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="p-0">
        <form
          id="sign-up-form"
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
      <CardFooter className="flex flex-col text-center w-full p-0  mt-2">
        <form.Subscribe
          selector={(state) => state.isSubmitting}
          children={(isSubmitting) => (
            <Field>
              <Button
                type="submit"
                form="sign-up-form"
                className="cursor-pointer"
                disabled={isSubmitting}
              >
                <LoadingSwap isLoading={isSubmitting}>Sign Up</LoadingSwap>
              </Button>
            </Field>
          )}
        ></form.Subscribe>
      </CardFooter>
    </Card>
  );
}
