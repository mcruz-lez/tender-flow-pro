import { render, screen } from "@testing-library/react";
import MessagingPage from "./MessagingPage";
import { AuthContext } from "@/contexts/useAuth";
import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("@supabase/supabase-js");

const mockUser = {
  id: "test",
  role: "property_manager",
  app_metadata: {},
  user_metadata: {},
  aud: "authenticated",
  created_at: new Date().toISOString(),
};

const mockAuthContext = {
  user: mockUser,
  session: null,
  loading: false,
  signUp: vi.fn(async () => ({ error: null })),
  signIn: vi.fn(async () => ({ error: null })),
  signOut: vi.fn(async () => {}),
  resetPassword: vi.fn(async () => ({ error: null })),
};

describe("MessagingPage", () => {
  it("renders messaging UI for authenticated user", async () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <MessagingPage />
      </AuthContext.Provider>,
    );
    expect(await screen.findByText(/Threads/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Messages/i).length).toBeGreaterThan(0);
  });
  // Add more tests for threads, permissions, and real-time updates
});
