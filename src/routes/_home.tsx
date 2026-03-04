import Header from "@/components/Header";
import { Session } from "@/features/auth/server/auth";
import { getSession } from "@/lib/auth";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_home")({
  loader: async () => {
    const session = await getSession();
    return session;
  },
  component: () => {
    return (
      <div className="container">
        <Header />
        <Outlet />
      </div>
    );
  },
});
