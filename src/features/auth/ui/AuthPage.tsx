import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { LoginForm } from "./LoginForm";

export function AuthPage() {
  return (
    <div className="container flex flex-col h-screen">
      <div className="flex flex-1 justify-center items-center">
        <div className="grid grid-cols-3 max-h-170 h-full w-full gap-4">
          {/* Image */}
          <div className="col-span-2 border rounded-2xl">Image</div>

          {/* Login / Signup */}
          <div className="p-5 w-full h-full max-w-100">
            {/* Sign up */}
            <div className="flex justify-end-safe items-center gap-4">
              <p className="text-muted-foreground text-sm">
                Don't have an account?
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link to=".">Sign Up</Link>
              </Button>
            </div>

            {/* Log In */}
            <div className="flex flex-col justify-center h-full">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
