import { createFileRoute } from "@tanstack/react-router";
import { SignUpContainer } from "@/features/auth";

export const Route = createFileRoute("/_auth/signup/")({
  component: SignUpContainer,
});
