import { createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { toast } from "sonner";
import { QueryClient } from "@tanstack/react-query";

// Create a new router instance
export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    defaultNotFoundComponent: () => <h1>404 Page Not Found</h1>,
    defaultErrorComponent: ({ error, reset }) => {
      toast.error(error.message);

      return (
        <div>
          <h1>Something went wrong!</h1>
          <p>{error.message}</p>
          <button onClick={() => reset()}>Try Again</button>
        </div>
      );
    },
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
    context: {
      queryClient,
    },

    scrollRestoration: true,
    defaultPreloadStaleTime: Infinity,
  });
  return router;
};
