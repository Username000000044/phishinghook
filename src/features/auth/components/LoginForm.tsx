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
import { AuthField } from "./ui/AuthField";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { loginSchema } from "../schemas/auth.schema";
import { authClient } from "../client/auth-client";
import { maskEmail } from "../server/helpers";
import { toast } from "sonner";
import { GoogleOneTap } from "./GoogleOneTap";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

export function LoginForm() {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      remember_me: false,
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value: { email, password } }) => {
      const rememberMe = form.state.values.remember_me;

      await authClient.signIn.email({
        email, // required
        password, // required
        rememberMe: rememberMe,
        fetchOptions: {
          onSuccess(context) {
            navigate({ to: "/dashboard" });
          },
          onError(context) {
            const error = context.error;
            if (error.code === "INVALID_EMAIL_OR_PASSWORD") {
              form.setFieldMeta("email", (prev) => ({
                ...prev,
                errorMap: {
                  ...prev.errorMap,
                  onSubmit: error.message,
                },
              }));

              form.setFieldMeta("password", (prev) => ({
                ...prev,
                errorMap: {
                  ...prev.errorMap,
                  onSubmit: error.message,
                },
              }));
            } else {
              toast.error(
                "Unable to login. Try to send it again in a few seconds.",
              );
              throw new Error(`Unexpected: ${error}`);
            }
          },
        },
      });
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
            <form.Field name="remember_me">
              {(field) => (
                <Field orientation="horizontal">
                  <Checkbox
                    id={field.name}
                    name={field.name}
                    checked={field.state.value}
                    onCheckedChange={(e) => field.handleChange(e === true)}
                  />
                  <Label htmlFor={field.name} className="text-sm">
                    Remember for 7 days
                  </Label>
                </Field>
              )}
            </form.Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col text-center w-full p-0">
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

        {/* Oauth */}
        <section className="flex flex-col items-center space-y-4 mt-4 w-full">
          <div className="flex justify-center items-center gap-5 w-full">
            <hr className="bg-muted w-full h-[1px]" />
            <p className="text-xs text-muted">OR</p>
            <hr className="bg-muted w-full h-[1px]" />
          </div>

          <GoogleOneTap />
        </section>
      </CardFooter>
    </Card>
  );
}
