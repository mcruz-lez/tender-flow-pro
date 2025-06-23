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

// Supabase client is disconnected. No URL or anon key present.
