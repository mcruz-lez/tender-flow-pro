
import { supabase } from "@/integrations/supabase/client";

// --- USER SETTINGS API ---
// Note: Using profiles table since settings table doesn't exist in schema
export async function getUserSettings(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) throw error;
  return data;
}

export async function updateUserSettings(
  userId: string,
  updates: Record<string, unknown>,
) {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// --- ORG SETTINGS API ---
export async function getOrgSettings(orgId: string) {
  const { data, error } = await supabase
    .from("organizations")
    .select("*")
    .eq("id", orgId)
    .single();
  if (error) throw error;
  return data;
}

export async function updateOrgSettings(
  orgId: string,
  updates: Record<string, unknown>,
) {
  const { data, error } = await supabase
    .from("organizations")
    .update(updates)
    .eq("id", orgId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// --- AUDIT LOG API ---
// Mock functions since audit_logs table doesn't exist
export async function getAuditLogs(limit = 50) {
  console.log("Audit logs not implemented - table doesn't exist");
  return [];
}

// --- MESSAGING API ---
// Mock functions since threads/messages tables don't exist
export async function getThreads(userId: string) {
  console.log("Messaging not implemented - threads table doesn't exist", userId);
  return [];
}

export async function getMessages(threadId: string) {
  console.log("Messaging not implemented - messages table doesn't exist", threadId);
  return [];
}

export async function sendMessage(
  threadId: string,
  senderId: string,
  content: string,
) {
  console.log("Messaging not implemented - messages table doesn't exist", threadId, senderId, content);
  return { id: "mock", thread_id: threadId, sender_id: senderId, content, created_at: new Date().toISOString() };
}

// --- DOCUMENT MANAGEMENT API ---
// Mock functions since documents table doesn't exist
export async function getDocuments(userId: string) {
  console.log("Documents not implemented - documents table doesn't exist", userId);
  return [];
}

export async function uploadDocument(doc: {
  owner_id: string;
  name: string;
  url: string;
}) {
  console.log("Document upload not implemented - documents table doesn't exist", doc);
  return { id: "mock", ...doc, created_at: new Date().toISOString() };
}
