import Footer from "@/components/Footer";
import { BareHeader } from "@/components/Header";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { SessionRouteContext } from "@/types/router";

export const Route = createFileRoute("/_protected")<{
  RouteContext: SessionRouteContext;
}>({
  beforeLoad: async ({ context, location }) => {
    if (!context.session) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }
  },
  component: () => (
    <div className="grid-row-layout">
      <BareHeader className="mb-21" />
      <Outlet />
      <Footer />
    </div>
  ),
});
