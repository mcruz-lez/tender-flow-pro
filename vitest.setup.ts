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

// Polyfill ResizeObserver for UI library compatibility in tests
if (typeof window !== "undefined" && !window.ResizeObserver) {
  class ResizeObserverPolyfill {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  window.ResizeObserver = ResizeObserverPolyfill;
}

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
