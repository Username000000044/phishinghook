import { URLGamePage } from "@/features/home";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_home/games/url")({
  component: URLGamePage,
});
