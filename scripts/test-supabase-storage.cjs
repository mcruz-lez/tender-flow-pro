const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testStorage() {
  // Try to list files in a public bucket (replace 'public' with your bucket name)
  const { data, error } = await supabase.storage.from("public").list();
  if (error) {
    console.error("❌ Supabase Storage error:", error.message);
    process.exit(1);
  } else {
    console.log("✅ Supabase Storage list successful! Example data:", data);
    process.exit(0);
  }
}

testStorage();
