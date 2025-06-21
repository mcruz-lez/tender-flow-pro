import { render, screen } from "@testing-library/react";
import AuditLogs from "./AuditLogs";
import { AuthContext } from "@/contexts/AuthContext";
import "@testing-library/jest-dom";
import { vi } from "vitest";

const mockUser = {
  id: "admin-id",
  role: "admin",
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

describe("AuditLogs Page", () => {
  it("renders audit logs table for admin", async () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <AuditLogs />
      </AuthContext.Provider>,
    );
    expect(await screen.findByText(/Audit Logs/i)).toBeInTheDocument();
  });
  // Add more tests for RBAC, error, and data rendering
});
