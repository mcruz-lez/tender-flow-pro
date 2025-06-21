// Demo/sample data seeding for onboarding and testing
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function seedDemoData() {
  // Insert demo users, properties, threads, messages, documents, etc.
  await supabase.from("users").insert([
    { id: "demo1", email: "demo1@tenderflow.com", role: "property_manager" },
    { id: "demo2", email: "demo2@tenderflow.com", role: "vendor" },
  ]);
  await supabase
    .from("threads")
    .insert([
      {
        id: "thread1",
        user1_id: "demo1",
        user2_id: "demo2",
        updated_at: new Date().toISOString(),
      },
    ]);
  await supabase
    .from("messages")
    .insert([
      {
        thread_id: "thread1",
        sender_id: "demo1",
        content: "Welcome to TenderFlow!",
        created_at: new Date().toISOString(),
      },
    ]);
  // ...add more demo data as needed
  return "Demo data seeded.";
}
