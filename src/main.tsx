import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";

const queryClient = new QueryClient();

declare global {
  interface ImportMeta {
    env: {
      VITE_API_BASE_URL: string;
    };
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen">
          <App />
        </div>
      </QueryClientProvider>
    </Suspense>
  </StrictMode>
);
