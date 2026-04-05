import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { getSession } from "@/lib/auth";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_home")({
  loader: async () => {
    const session = await getSession();
    return { isAuthenicated: !!session, session };
  },
  component: () => {
    return (
      <div>
        {/* Header / Content / Footer */}
        <div className="grid-row-layout">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </div>
    );
  },
});
