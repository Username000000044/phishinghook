import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link, redirect } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { authClient } from "../client/auth-client";
import { useEffect, useRef } from "react";

const formSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(128, "Password exceeds 128 character limit."),
});

function SignInButton() {
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (buttonRef.current) {
      authClient.oneTap({
        button: {
          container: buttonRef.current,
          config: {
            theme: "filled_black",
            size: "medium",
            type: "standard",
          },
        },
        fetchOptions: {
          onSuccess: () => {
            console.log("AUTHENTICATED");
          },
        },
      });
    }
  }, []);

  return <div ref={buttonRef}></div>;
}

export function LoginForm() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      //submit logic (not in order)
      //db (integrate salt + hash)
      //betterAuth integrate
      //redirect
      //sql inject problems
    },
  });

  return (
    <Card className="bg-transparent border-none p-0">
      <CardHeader className="text-center p-0 space-y-2">
        <CardTitle className="text-2xl">Sign in to PhishHook</CardTitle>
        <CardDescription className="text-muted-foreground">
          Welcome to PhishHook, please enter your login details to use the app.
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
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <Input
                      className="h-10 rounded-none"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Email Address"
                      type="text"
                      aria-invalid={isInvalid}
                      autoComplete="on"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            ></form.Field>
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <Input
                      className="h-10 rounded-none"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Password"
                      type="password"
                      aria-invalid={isInvalid}
                      autoComplete="pff"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            ></form.Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col text-center w-full p-0 space-y-6">
        <Link to="." className="text-sm text-primary">
          Forgot the password?
        </Link>

        <Field>
          <Button type="submit" form="sign-in-form" className="cursor-pointer">
            Login
          </Button>
        </Field>

        <div className="flex justify-center items-center gap-5 w-full">
          <hr className="bg-muted w-full h-[1px]" />
          <p className="text-xs text-muted">OR</p>
          <hr className="bg-muted w-full h-[1px]" />
        </div>

        <SignInButton />
      </CardFooter>
    </Card>
  );
}
