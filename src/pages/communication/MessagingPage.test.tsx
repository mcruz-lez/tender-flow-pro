import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MessagingPage, { MessagingApi } from "./MessagingPage";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import { act } from "react";

// Mock useAuth hook
vi.mock("@/contexts/useAuth", () => ({
  useAuth: vi.fn(),
}));
import { useAuth } from "@/contexts/useAuth";

const mockUser = {
  id: "test",
  role: "property_manager",
  app_metadata: {},
  user_metadata: {},
  aud: "authenticated",
  created_at: new Date().toISOString(),
};

describe("MessagingPage", () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReset?.();
  });

  it("renders messaging UI for authenticated user", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      session: null,
      loading: false,
      signUp: vi.fn(),
      signIn: vi.fn(),
      signOut: vi.fn(),
      resetPassword: vi.fn(),
    });
    await act(async () => {
      render(
        <MemoryRouter>
          <MessagingPage />
        </MemoryRouter>
      );
    });
    expect(screen.getByRole("heading", { name: /Threads/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Messages/i })).toBeInTheDocument();
  });

  it("shows a message if no threads are found", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      session: null,
      loading: false,
      signUp: vi.fn(),
      signIn: vi.fn(),
      signOut: vi.fn(),
      resetPassword: vi.fn(),
    });
    const mockApi: MessagingApi = {
      getThreads: vi.fn().mockResolvedValueOnce([]),
      getMessages: vi.fn().mockResolvedValueOnce([]),
      sendMessage: vi.fn(),
    };
    await act(async () => {
      render(
        <MemoryRouter>
          <MessagingPage api={mockApi} />
        </MemoryRouter>
      );
    });
    expect(screen.getByText(/No threads found/i)).toBeInTheDocument();
  });

  it("shows a message if user is not authenticated", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      session: null,
      loading: false,
      signUp: vi.fn(),
      signIn: vi.fn(),
      signOut: vi.fn(),
      resetPassword: vi.fn(),
    });
    await act(async () => {
      render(
        <MemoryRouter>
          <MessagingPage />
        </MemoryRouter>
      );
    });
    expect(screen.getByText(/Please sign in to use messaging/i)).toBeInTheDocument();
  });

  it("shows loading state when fetching messages", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      session: null,
      loading: false,
      signUp: vi.fn(),
      signIn: vi.fn(),
      signOut: vi.fn(),
      resetPassword: vi.fn(),
    });
    const mockApi: MessagingApi = {
      getThreads: vi.fn().mockResolvedValueOnce([{ id: "1", subject: "Test" }]),
      getMessages: vi.fn().mockImplementation(() => new Promise(() => {})), // never resolves
      sendMessage: vi.fn(),
    };
    await act(async () => {
      render(
        <MemoryRouter>
          <MessagingPage api={mockApi} />
        </MemoryRouter>
      );
    });
    expect(screen.getAllByText(/Threads/i).length).toBeGreaterThan(0);
  });
});
