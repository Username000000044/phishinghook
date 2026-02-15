import { createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
export const getRouter = () => {
  const router = createRouter({
    defaultNotFoundComponent: () => <h1>404 Page Not Found</h1>,
    defaultOnCatch: (error) => {
      if (
        error instanceof Error &&
        error.message.includes("error loading dynamically imported module")
      ) {
        // Force a hard reload to sync the browser with the Vite dev server
        window.location.reload();
      }
    },
    routeTree,
    context: {},

    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });
  return router;
};
