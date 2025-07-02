import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import "./sentry";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

// Enable React Router v7 future flags for transition and splat path
// Note: If your IDE or linter does not recognize the 'future' prop, this is expected—
// it is supported in React Router v6.23+ and will be standard in v7. This is safe for production.
const future = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
};

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter future={future}>
      <App />
    </BrowserRouter>
  </QueryClientProvider>
);
