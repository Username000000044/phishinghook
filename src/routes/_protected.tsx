import Footer from "@/components/Footer";
import { BareHeader } from "@/components/Header";
import { getSession } from "@/lib/auth";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
  beforeLoad: async ({ location }) => {
    const session = await getSession();

    if (!session) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }

    return { session };
  },
  component: () => (
    <div className="grid-row-layout">
      <BareHeader />
      <Outlet />
      <Footer />
    </div>
  ),
});
