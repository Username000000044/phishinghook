import Footer from "@/components/Footer";
import { BareHeader } from "@/components/Header";
import { fetchSession } from "@/lib/auth";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
  beforeLoad: async ({ context, location }) => {
    const session = await context.queryClient.ensureQueryData({
      queryKey: ["session"],
      queryFn: () => fetchSession(),
    });

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
