import { useForm } from "@tanstack/react-form";
import { useRouter } from "@tanstack/react-router";
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
import { isEmailTaken } from "../../server/actions";
import { LoadingSwap } from "@/components/ui/loading-swap";

export function SignUpForm() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
    },
    validators: {
      onSubmit: signUpSchema,
      onSubmitAsync: async ({ value }) => {
        const taken = await isEmailTaken({ data: value.email });

        if (taken) {
          return {
            fields: {
              email: "This email is already in use",
            },
          };
        }

        return undefined;
      },
    },
    onSubmit: async () => {
      await router.navigate({ to: "/dashboard" });
    },
  });

  return (
    <Card className="bg-transparent border-none p-0">
      <CardHeader className="text-center p-0 space-y-2">
        <CardTitle className="text-2xl">Sign Up for PhishHook</CardTitle>
        <CardDescription className="text-muted-foreground">
          Welcome to PhishHook, please enter sign up details to use the app. An
          OTP and a Passkey is used for authentication!
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
                  autoComplete="text"
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
                <LoadingSwap isLoading={isSubmitting}>Login</LoadingSwap>
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
