import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import appCss from "../styles.css?url";
import { TooltipProvider } from "@/components/ui/tooltip";
import { sessionQueryOptions } from "@/lib/auth";
import { useEffect } from "react";

export interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Phishing Hook",
        content:
          "An innovative solution to security based phishing training to level up your online safety.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),

  beforeLoad: async ({ context }) => {
    const session =
      await context.queryClient.ensureQueryData(sessionQueryOptions);

    return { session };
  },

  shellComponent: RootComponent,
});

function RootComponent() {
  // This pulls the specific queryClient instance created in your router file
  const { queryClient, session } = Route.useRouteContext();

  useEffect(() => {
    queryClient.setQueryData(["session"], session);
  }, [queryClient, session]);

  return (
    <RootDocument queryClient={queryClient}>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({
  children,
  queryClient,
}: {
  children: React.ReactNode;
  queryClient: QueryClient;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <div className="dotted-background">
            <TooltipProvider>{children}</TooltipProvider>
          </div>
          <Toaster />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />

        <Scripts />
      </body>
    </html>
  );
}
