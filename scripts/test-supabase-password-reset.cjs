const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testPasswordReset() {
  const email = `ci-reset-${Date.now()}@example.com`;
  const password = "TestPassword123!";

  // Sign up
  const { error: signUpError } = await supabase.auth.signUp({ email, password });
  if (signUpError) {
    console.error("❌ Supabase Password Reset signUp error:", signUpError.message);
    process.exit(1);
  }

  // Request password reset
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) {
    console.error("❌ Supabase Password Reset request error:", error.message);
    process.exit(1);
  }
  if (data) {
    console.log("✅ Supabase password reset email sent (check your test inbox if configured).");
    process.exit(0);
  } else {
    console.error("❌ Supabase password reset did not trigger as expected.", data);
    process.exit(1);
  }
}

testPasswordReset();
