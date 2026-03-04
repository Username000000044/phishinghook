import { EmailGamePage } from "@/features/home";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_home/games/email")({
  component: EmailGamePage,
});
