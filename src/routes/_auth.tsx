import { AuthLayout } from "@/features/auth";
import { getSession } from "@/lib/auth";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async ({ location }) => {
    const session = await getSession();

    if (session) {
      throw redirect({
        to: "/dashboard",
        search: { redirect: location.href },
      });
    }
  },
  component: () => (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  ),
});
