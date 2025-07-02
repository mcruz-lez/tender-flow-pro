import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import DocumentManagementPage from "./DocumentManagementPage";
import { AuthContext } from "@/contexts/useAuth";
import "@testing-library/jest-dom";
import { vi } from "vitest";

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

describe("DocumentManagementPage", () => {
  it("renders document management UI for authenticated user", async () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <DocumentManagementPage />
      </AuthContext.Provider>,
    );
    expect(await screen.findByText(/Document Management/i)).toBeInTheDocument();
  });
  // Add more tests for upload, permissions, and file listing
});
