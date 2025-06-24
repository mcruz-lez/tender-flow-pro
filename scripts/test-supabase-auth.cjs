const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testAuth() {
  // Use a random email to avoid conflicts
  const email = `ci-test-${Date.now()}@example.com`;
  const password = "TestPassword123!";

  // Sign up
  const { error: signUpError } = await supabase.auth.signUp({ email, password });
  if (signUpError) {
    console.error("❌ Supabase Auth signUp error:", signUpError.message);
    process.exit(1);
  }
  console.log("✅ Supabase Auth signUp successful");

  // Sign in
  const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
  if (signInError) {
    console.error("❌ Supabase Auth signIn error:", signInError.message);
    process.exit(1);
  }
  console.log("✅ Supabase Auth signIn successful");

  // Sign out
  const { error: signOutError } = await supabase.auth.signOut();
  if (signOutError) {
    console.error("❌ Supabase Auth signOut error:", signOutError.message);
    process.exit(1);
  }
  console.log("✅ Supabase Auth signOut successful");
  process.exit(0);
}

testAuth();
