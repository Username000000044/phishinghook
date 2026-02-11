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
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { GoogleOneTap } from "./components/GoogleOneTap";
import { loginSchema } from "../schemas/auth.schema";
import { AuthField } from "./components/AuthField";

export function LoginForm() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
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
            <form.Field name="email">
              {/* data from parent is auto passed down as a prop named children */}
              {(field) => (
                <AuthField
                  field={field}
                  placeholder="Email Address"
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
                  autoComplete="current-password"
                />
              )}
            </form.Field>
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

        <GoogleOneTap />
      </CardFooter>
    </Card>
  );
}
