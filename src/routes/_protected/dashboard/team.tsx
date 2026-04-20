import { TeamPage } from "@/features/dashboard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/dashboard/team")({
  component: TeamPage,
});
