import Footer from "@/components/Footer";
import { BareHeader } from "@/components/Header";
import { Github, GoogleOneTap } from "@/features/auth";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async ({ context, location }) => {
    if (context.session) {
      throw redirect({
        to: "/dashboard",
        search: { redirect: location.href },
      });
    }
  },
  component: () => {
    return (
      //  Header / Content / Footer
      <div className="grid-row-layout">
        <BareHeader />
        <div className="container flex justify-center gap-[1.5rem] md:gap-20 px-[2rem] md:px-[8rem] my-auto">
          {/* Image */}
          <section className="hidden xl:block w-full border rounded-2xl">
            Image
          </section>

          {/* Content */}
          <section className="flex flex-col justify-center items-center max-w-110 w-full">
            <Outlet />
            <section className="flex flex-col items-center space-y-4 mt-4 w-full">
              <div className="flex justify-center items-center gap-5 w-full">
                <hr className="bg-muted w-full h-[1px]" />
                <p className="text-xs text-muted">OR</p>
                <hr className="bg-muted w-full h-[1px]" />
              </div>

              {/* OAUTH */}
              <div className="flex items-center gap-4">
                <GoogleOneTap />
                <Github />
              </div>
            </section>
          </section>
        </div>
        <Footer />
      </div>
    );
  },
});
