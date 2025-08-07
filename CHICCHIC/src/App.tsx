import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryCliient } from "./lib/queryClient";

function App() {
  return (
    <QueryClientProvider client={queryCliient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
