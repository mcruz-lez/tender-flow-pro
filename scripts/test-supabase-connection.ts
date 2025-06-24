import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("❌ SUPABASE_URL or SUPABASE_ANON_KEY is missing from environment variables.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const tables = ["bids", "tenders", "messages", "settings", "documents"];

async function testTable(table: string) {
  const { data, error } = await supabase.from(table).select("*").limit(1);
  if (error) {
    console.error(`❌ Supabase connection error for table '${table}':`, error.message);
    return false;
  } else {
    console.log(`✅ Supabase connection successful for table '${table}'! Example data:`, data);
    return true;
  }
}

(async () => {
  let allPassed = true;
  for (const table of tables) {
    const ok = await testTable(table);
    if (!ok) allPassed = false;
  }
  process.exit(allPassed ? 0 : 1);
})();
