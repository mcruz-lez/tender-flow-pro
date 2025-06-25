// Silence Supabase fallback and 404 test warnings for clean output
const originalWarn = global.console.warn;
global.console.warn = (msg, ...args) => {
  if (
    typeof msg === "string" &&
    (
      /Supabase client does not support \.or or \.filter\. Returning (all rows|all threads) without filtering\./.test(msg) ||
      /404 Error: User attempted to access non-existent route:/.test(msg)
    )
  ) {
    return;
  }
  return originalWarn(msg, ...args);
};

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AppRoutes } from "@/App";
import { AuthProvider } from "@/contexts/AuthContext";
import "@testing-library/jest-dom";
import { act } from "react";

describe("Manual QA Checklist", () => {
  it("renders all main routes without error", async () => {
    // Only test routes that are actually defined in the app and accessible
    const routes = ["/", "/login", "/register", "/dashboard"]; // removed /settings
    for (const route of routes) {
      await act(async () => {
        render(
          <AuthProvider>
            <MemoryRouter initialEntries={[route]}>
              <AppRoutes />
            </MemoryRouter>
          </AuthProvider>
        );
      });
      expect(screen.queryByRole("heading", { name: /404/i })).not.toBeInTheDocument();
      expect(screen.queryByText(/Page Not Found/i)).not.toBeInTheDocument();
    }
  });

  it("renders 404 page for invalid route", async () => {
    await act(async () => {
      render(
        <AuthProvider>
          <MemoryRouter initialEntries={["/not-a-real-page"]}>
            <AppRoutes />
          </MemoryRouter>
        </AuthProvider>
      );
    });
    expect(screen.getByRole("heading", { name: /404/i })).toBeInTheDocument();
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
  });
});
