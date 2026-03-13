import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async (ctx) => {
        // if (import.meta.env.DEV) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        // }
      },
      staleTime: 1000 * 60, // 1 min
      retry: 1,
    },
  },
});
