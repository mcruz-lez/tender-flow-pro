const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
require("dotenv").config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testStorageDownloadDelete() {
  // Upload a file
  const filePath = "./ci-download-delete-test.txt";
  fs.writeFileSync(filePath, "Hello from CI download/delete test!");
  const file = fs.readFileSync(filePath);
  const fileName = `ci-download-delete-test-${Date.now()}.txt`;
  const { data: uploadData, error: uploadError } = await supabase.storage.from("public").upload(fileName, file, {
    contentType: "text/plain",
    upsert: true,
  });
  if (uploadError) {
    console.error("❌ Supabase Storage upload error:", uploadError.message);
    process.exit(1);
  }
  console.log("✅ Supabase Storage upload for download/delete test successful.");

  // Download the file
  const { data: downloadData, error: downloadError } = await supabase.storage.from("public").download(fileName);
  if (downloadError) {
    console.error("❌ Supabase Storage download error:", downloadError.message);
    process.exit(1);
  }
  console.log("✅ Supabase Storage download successful. File size:", downloadData.size);

  // Delete the file
  const { data: deleteData, error: deleteError } = await supabase.storage.from("public").remove([fileName]);
  if (deleteError) {
    console.error("❌ Supabase Storage delete error:", deleteError.message);
    process.exit(1);
  }
  console.log("✅ Supabase Storage delete successful.");
  process.exit(0);
}

testStorageDownloadDelete();
