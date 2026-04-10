import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_home")({
  component: async () => (
    <div>
      {/* Header / Content / Footer */}
      <div className="grid-row-layout">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  ),
});
