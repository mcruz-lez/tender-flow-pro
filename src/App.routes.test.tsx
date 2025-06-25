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
import App from "@/App";
import "@testing-library/jest-dom";
import { act } from "react";

describe("App Routing", () => {
  it("renders the Index page at /", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      );
    });
    expect(screen.getAllByRole("heading", { name: /TendProcure/i }).length).toBeGreaterThan(0);
  });

  it("renders the Login page at /login", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/login"]}>
          <App />
        </MemoryRouter>
      );
    });
    expect(screen.getByRole("button", { name: /Sign In/i })).toBeInTheDocument();
  });

  it("renders the Register page at /register", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/register"]}>
          <App />
        </MemoryRouter>
      );
    });
    expect(screen.getByRole("heading", { name: /Create Your Account/i })).toBeInTheDocument();
  });

  it("renders the 404 page for unknown routes", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/unknown"]}>
          <App />
        </MemoryRouter>
      );
    });
    expect(screen.getByRole("heading", { name: /404/i })).toBeInTheDocument();
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
  });
});
