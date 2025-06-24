const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
require("dotenv").config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testFileUpload() {
  // Create a test file
  const filePath = "./ci-upload-test.txt";
  fs.writeFileSync(filePath, "Hello from CI test!");
  const file = fs.readFileSync(filePath);

  // Upload to the 'public' bucket (replace with your bucket name if needed)
  const { data, error } = await supabase.storage.from("public").upload(`ci-upload-test-${Date.now()}.txt`, file, {
    contentType: "text/plain",
    upsert: true,
  });
  if (error) {
    console.error("❌ Supabase Storage upload error:", error.message);
    process.exit(1);
  } else {
    console.log("✅ Supabase Storage upload successful! File info:", data);
    process.exit(0);
  }
}

testFileUpload();
