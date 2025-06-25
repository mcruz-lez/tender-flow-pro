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

  it("renders 404 page for invalid route", () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={["/not-a-real-page"]}>
          <AppRoutes />
        </MemoryRouter>
      </AuthProvider>
    );
    expect(screen.getByRole("heading", { name: /404/i })).toBeInTheDocument();
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
  });
});
