import { supabase } from "@/integrations/supabase/client";

// Messaging API endpoint for threads, messages, and read receipts
// ...existing code...

export async function getMessages(threadId: string) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("thread_id", threadId)
    .order("created_at", { ascending: true });
  return { data, error };
}

export async function sendMessage(
  threadId: string,
  senderId: string,
  content: string,
) {
  const { data, error } = await supabase
    .from("messages")
    .insert([{ thread_id: threadId, sender_id: senderId, content }]);
  return { data, error };
}

export async function getThreads(userId: string) {
  const { data, error } = await supabase
    .from("threads")
    .select("*")
    .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
    .order("updated_at", { ascending: false });
  return { data, error };
}

// Test function to verify Supabase client connectivity
export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .limit(1);
    if (error) {
      console.error("[Supabase Test] Error:", error);
      return false;
    }
    console.log("[Supabase Test] Success. Sample data:", data);
    return true;
  } catch (err) {
    console.error("[Supabase Test] Exception:", err);
    return false;
  }
}

testSupabaseConnection();

// (Supabase client is now connected and configured via @/integrations/supabase/client)
