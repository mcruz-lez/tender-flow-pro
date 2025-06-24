const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testRLS() {
  // Attempt to read a row that should be protected by RLS (e.g., a settings row for another user)
  const forbiddenUserId = "forbidden-user-id";
  const { data, error } = await supabase.from("settings").select("*").eq("user_id", forbiddenUserId);
  if (error && error.code === '42501') {
    console.log("✅ RLS enforced: Access denied as expected.");
    process.exit(0);
  } else if (data && data.length === 0) {
    console.log("✅ RLS enforced: No data returned for unauthorized user.");
    process.exit(0);
  } else {
    console.error("❌ RLS NOT enforced: Data was returned or no error.", { data, error });
    process.exit(1);
  }
}

testRLS();
