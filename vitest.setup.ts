import { vi } from "vitest";

vi.mock("@/integrations/supabase/client", () => {
  return {
    supabase: {
      auth: {
        onAuthStateChange: vi.fn(() => ({
          data: { subscription: { unsubscribe: vi.fn() } },
        })),
        getSession: vi.fn(() => Promise.resolve({ data: { session: null } })),
        signUp: vi.fn(() => Promise.resolve({ error: null })),
        signIn: vi.fn(() => Promise.resolve({ error: null })),
        signOut: vi.fn(() => Promise.resolve()),
      },
      from: vi.fn(() => ({
        select: vi.fn().mockReturnThis(),
        insert: vi.fn().mockReturnThis(),
        update: vi.fn().mockReturnThis(),
        delete: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        order: vi.fn().mockReturnThis(),
        single: vi.fn().mockReturnThis(),
        maybeSingle: vi.fn().mockReturnThis(),
        in: vi.fn().mockReturnThis(),
        on: vi.fn().mockReturnThis(),
        subscribe: vi.fn().mockReturnThis(),
      })),
    },
  };
});

vi.mock("@/integrations/supabase/api", () => {
  return {
    supabase: {
      auth: {
        onAuthStateChange: vi.fn(() => ({
          data: { subscription: { unsubscribe: vi.fn() } },
        })),
        getSession: vi.fn(() => Promise.resolve({ data: { session: null } })),
        signUp: vi.fn(() => Promise.resolve({ error: null })),
        signIn: vi.fn(() => Promise.resolve({ error: null })),
        signOut: vi.fn(() => Promise.resolve()),
      },
      from: vi.fn(() => ({
        select: vi.fn().mockReturnThis(),
        insert: vi.fn().mockReturnThis(),
        update: vi.fn().mockReturnThis(),
        delete: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        order: vi.fn().mockReturnThis(),
        single: vi.fn().mockReturnThis(),
        maybeSingle: vi.fn().mockReturnThis(),
        in: vi.fn().mockReturnThis(),
        on: vi.fn().mockReturnThis(),
        subscribe: vi.fn().mockReturnThis(),
      })),
    },
  };
});
