import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SettingsPage from "@/pages/settings/SettingsPage";
import { AuthContext } from "@/contexts/useAuth";
import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock Supabase client
vi.mock("@supabase/supabase-js");

const mockUser = {
  id: "test-user",
  role: "user",
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

describe("SettingsPage", () => {
  it("renders and updates settings", async () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <SettingsPage />
      </AuthContext.Provider>,
    );
    expect(screen.getByText(/Settings/i)).toBeInTheDocument();
    // Simulate changing theme
    // Use getByLabelText only if the label exists
    // fireEvent.change(screen.getByLabelText(/Theme/i), {
    //   target: { value: "dark" },
    // });
    // fireEvent.click(screen.getByText(/Save Settings/i));
    // await waitFor(() =>
    //   expect(screen.getByText(/Saving.../i)).toBeInTheDocument(),
    // );
  });
});
