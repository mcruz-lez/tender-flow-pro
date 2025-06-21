// Mock for @supabase/supabase-js for Vitest
export const createClient = () => ({
  from: () => ({
    select: () => ({ data: [], error: null }),
    insert: () => ({ data: [], error: null }),
    eq: () => ({ data: [], error: null }),
    order: () => ({ data: [], error: null }),
  }),
});
