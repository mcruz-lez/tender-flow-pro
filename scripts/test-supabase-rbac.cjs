const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testRBAC() {
  // Simulate sign-in as different roles and try to access restricted data
  // This example assumes you have a 'role' field in your users table and RLS policies set up
  const testRoles = [
    { email: "admin@example.com", password: "TestPassword123!", allowed: true },
    { email: "vendor@example.com", password: "TestPassword123!", allowed: false },
  ];

  for (const { email, password, allowed } of testRoles) {
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      console.error(`❌ RBAC: Sign in failed for ${email}:`, signInError.message);
      process.exit(1);
    }
    const session = signInData.session;
    const userClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { global: { headers: { Authorization: `Bearer ${session.access_token}` } } });
    const { data, error } = await userClient.from("settings").select("*");
    if (allowed && error) {
      console.error(`❌ RBAC: Admin should have access but got error:`, error.message);
      process.exit(1);
    } else if (!allowed && !error) {
      console.error(`❌ RBAC: Vendor should NOT have access but got data:`, data);
      process.exit(1);
    } else {
      console.log(`✅ RBAC: Access control correct for ${email}`);
    }
    await supabase.auth.signOut();
  }
  process.exit(0);
}

testRBAC();
