import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SettingsPage from "@/pages/settings/SettingsPage";
import { AuthProvider } from "@/contexts/AuthContext";
import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock Supabase client
vi.mock("@supabase/supabase-js");

describe("SettingsPage", () => {
  it("renders and updates settings", async () => {
    render(
      <AuthProvider>
        <SettingsPage />
      </AuthProvider>,
    );
    // Use jest-dom matcher
    expect(screen.getByText(/Settings/i)).toBeInTheDocument();
    // Simulate changing theme
    fireEvent.change(screen.getByLabelText(/Theme/i), {
      target: { value: "dark" },
    });
    fireEvent.click(screen.getByText(/Save Settings/i));
    await waitFor(() =>
      expect(screen.getByText(/Saving.../i)).toBeInTheDocument(),
    );
  });
});
