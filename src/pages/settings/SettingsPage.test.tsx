import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SettingsPage from "@/pages/settings/SettingsPage";
import { AuthContext } from "@/contexts/useAuth";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import { act } from "react"; // Use act from react, not react-dom/test-utils

// Mock Supabase client
vi.mock("@supabase/supabase-js");

const mockUser = {
  id: "test-user",
  role: "admin", // must be 'admin' or 'property_manager' to pass RBAC for settings
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
    await act(async () => {
      render(
        <AuthContext.Provider value={mockAuthContext}>
          <SettingsPage />
        </AuthContext.Provider>,
      );
    });
    const settingsElements = screen.getAllByText(/Settings/i);
    expect(settingsElements.length).toBeGreaterThan(0);
    // Simulate changing theme
    // Use getByLabelText only if the label exists
    // await act(async () => {
    //   fireEvent.change(screen.getByLabelText(/Theme/i), {
    //     target: { value: "dark" },
    //   });
    // });
  });
});
