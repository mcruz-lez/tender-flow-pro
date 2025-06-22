// Mock for @supabase/supabase-js for Vitest
export const createClient = () => ({
  from: () => ({
    select: function () {
      return this;
    },
    insert: function () {
      return this;
    },
    update: function () {
      return this;
    },
    delete: function () {
      return this;
    },
    eq: function () {
      return this;
    },
    or: function () {
      return this;
    },
    order: function () {
      return this;
    },
    limit: function () {
      return this;
    },
    // Final call returns mock data
    then: function (cb) {
      return cb({ data: [], error: null });
    },
  }),
  auth: {
    onAuthStateChange: () => ({
      data: { subscription: { unsubscribe: () => {} } },
    }),
    getSession: () => Promise.resolve({ data: { session: null } }),
    signUp: () => Promise.resolve({ error: null }),
    signIn: () => Promise.resolve({ error: null }),
    signOut: () => Promise.resolve(),
  },
});
