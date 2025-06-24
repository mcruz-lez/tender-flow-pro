const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testEmailVerification() {
  const email = `ci-verify-${Date.now()}@example.com`;
  const password = "TestPassword123!";

  // Sign up
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    console.error("❌ Supabase Email Verification signUp error:", error.message);
    process.exit(1);
  }
  if (data.user && !data.user.email_confirmed_at) {
    console.log("✅ Supabase signUp successful, verification email sent (check your test inbox if configured).");
    process.exit(0);
  } else {
    console.error("❌ Supabase signUp did not trigger email verification as expected.", data);
    process.exit(1);
  }
}

testEmailVerification();
