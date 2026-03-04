import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@features/home";
import { getSession } from "@/lib/auth";

export const Route = createFileRoute("/_home/")({
  loader: async () => {
    const session = await getSession();

    return { session };
  },
  component: HomePage,
});
