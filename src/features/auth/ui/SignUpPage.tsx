import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { SignUpForm } from "./components/SignUpForm";

export function SignUpPage() {
  return (
    <div className="container flex flex-col h-screen">
      <div className="flex flex-1 justify-center items-center">
        <div className="flex justify-center md:grid md:grid-cols-3 md:gap-4 max-h-170 h-full w-full">
          {/* Image */}
          <div className="hidden md:flex md:col-span-2 border rounded-2xl">
            Image
          </div>

          {/* Login / Signup */}
          <div className="p-5 w-full h-full max-w-100">
            {/* Sign up */}
            <div className="flex justify-end-safe items-center gap-4">
              <p className="text-muted-foreground text-sm">
                Already have an account?
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link to="/auth/login">Log In</Link>
              </Button>
            </div>

            {/* Log In */}
            <div className="flex flex-col justify-center h-full w-full">
              <SignUpForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
