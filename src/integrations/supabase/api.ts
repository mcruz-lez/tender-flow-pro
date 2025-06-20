import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    "https://lztlpenmmfsqyrwrjvnp.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6dGxwZW5tbWZzcXlyd3Jqdm5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMjg4NjIsImV4cCI6MjA2NTkwNDg2Mn0.ZY9EF-qaRCMo8Ucri4UvQ74IofUkP2ewnbuz2mAH_kA",
);

// --- SETTINGS API ---
export async function getUserSettings(userId: string) {
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .eq("user_id", userId)
    .single();
  if (error) throw error;
  return data;
}

export async function updateUserSettings(
  userId: string,
  updates: Record<string, any>,
) {
  const { data, error } = await supabase
    .from("settings")
    .update(updates)
    .eq("user_id", userId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// --- ORG SETTINGS API ---
export async function getOrgSettings(orgId: string) {
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .eq("org_id", orgId)
    .single();
  if (error) throw error;
  return data;
}

export async function updateOrgSettings(
  orgId: string,
  updates: Record<string, any>,
) {
  const { data, error } = await supabase
    .from("settings")
    .update(updates)
    .eq("org_id", orgId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// --- AUDIT LOG API ---
export async function getAuditLogs(limit = 50) {
  const { data, error } = await supabase
    .from("audit_logs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data;
}

// --- MESSAGING API ---
export async function getThreads(userId: string) {
  const { data, error } = await supabase
    .from("threads")
    .select("*")
    .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function getMessages(threadId: string) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("thread_id", threadId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data;
}

export async function sendMessage(
  threadId: string,
  senderId: string,
  content: string,
) {
  const { data, error } = await supabase
    .from("messages")
    .insert({ thread_id: threadId, sender_id: senderId, content })
    .select()
    .single();
  if (error) throw error;
  return data;
}

// --- DOCUMENT MANAGEMENT API ---
export async function getDocuments(userId: string) {
  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .eq("owner_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function uploadDocument(doc: {
  owner_id: string;
  name: string;
  url: string;
}) {
  const { data, error } = await supabase
    .from("documents")
    .insert(doc)
    .select()
    .single();
  if (error) throw error;
  return data;
}
