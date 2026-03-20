import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getSession } from "@/lib/auth";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_home")({
  loader: async () => {
    const session = await getSession();
    return { isAuthenicated: !!session, session };
  },
  component: () => {
    return (
      <div className="grid grid-rows-[auto_1fr_auto] h-screen p-5">
        <Header />
        <div className="container">
          <Outlet />
        </div>
        <Footer />
      </div>
    );
  },
});
