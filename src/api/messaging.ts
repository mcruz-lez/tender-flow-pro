import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

// Message and Thread types based on our new database schema
type Message = Tables<"messages">;
type Thread = Tables<"threads">;
type MessageInsert = TablesInsert<"messages">;
type ThreadInsert = TablesInsert<"threads">;

export async function getMessages(threadId: string) {
  try {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("thread_id", threadId)
      .order("created_at", { ascending: true });
    
    if (error) throw error;
    return { data: data as Message[], error: null };
  } catch (error) {
    console.error("Error fetching messages:", error);
    return { data: [], error };
  }
}

export async function sendMessage(
  threadId: string,
  senderId: string,
  content: string,
) {
  try {
    const messageData: MessageInsert = {
      thread_id: threadId,
      sender_id: senderId,
      content,
      message_type: "text"
    };

    const { data, error } = await supabase
      .from("messages")
      .insert(messageData)
      .select()
      .single();
    
    if (error) throw error;
    return { data: data as Message, error: null };
  } catch (error) {
    console.error("Error sending message:", error);
    return { data: null, error };
  }
}

export async function getThreads(userId: string) {
  try {
    // Get user's organization first
    const { data: profile } = await supabase
      .from("profiles")
      .select("organization_id")
      .eq("id", userId)
      .single();

    if (!profile?.organization_id) {
      return { data: [], error: "User has no organization" };
    }

    const { data, error } = await supabase
      .from("threads")
      .select("*")
      .eq("organization_id", profile.organization_id)
      .order("updated_at", { ascending: false });
    
    if (error) throw error;
    return { data: data as Thread[], error: null };
  } catch (error) {
    console.error("Error fetching threads:", error);
    return { data: [], error };
  }
}

export async function createThread(
  title: string,
  description: string,
  createdBy: string,
  organizationId: string
) {
  try {
    const threadData: ThreadInsert = {
      title,
      description,
      created_by: createdBy,
      organization_id: organizationId
    };

    const { data, error } = await supabase
      .from("threads")
      .insert(threadData)
      .select()
      .single();
    
    if (error) throw error;
    return { data: data as Thread, error: null };
  } catch (error) {
    console.error("Error creating thread:", error);
    return { data: null, error };
  }
}

// Test function to verify Supabase client connectivity
export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase
      .from("organizations")
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

// Initialize connection test
testSupabaseConnection();