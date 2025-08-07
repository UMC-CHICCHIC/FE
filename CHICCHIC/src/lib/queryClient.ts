import { QueryClient } from "@tanstack/react-query";

export const queryCliient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
    },
  },
});
