import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lztlpenmmfsqyrwrjvnp.supabase.co";
const anonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6dGxwZW5tbWZzcXlyd3Jqdm5wIiwicm9zZSI6ImFub24iLCJpYXQiOjE3NTAzMjg4NjIsImV4cCI6MjA2NTkwNDg2Mn0.ZY9EF-qaRCMo8Ucri4UvQ74IofUkP2ewnbuz2mAH_kA";

const supabase = createClient(supabaseUrl, anonKey);

async function testAnonKey() {
  const { data, error } = await supabase
    .from("profiles") // Change to a table that exists in your project
    .select("*")
    .limit(1);

  if (error) {
    console.error("Supabase connection error:", error);
  } else {
    console.log("Supabase connection success! Data:", data);
  }
}

testAnonKey();
