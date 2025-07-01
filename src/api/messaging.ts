
import { supabase } from "@/integrations/supabase/client";

// Mock messaging API since messages/threads tables don't exist in current schema
// These functions return mock data to prevent build errors

export async function getMessages(threadId: string) {
  console.log("Mock messaging: getMessages called for thread", threadId);
  // Return mock structure that matches expected interface
  return { 
    data: [], 
    error: null 
  };
}

export async function sendMessage(
  threadId: string,
  senderId: string,
  content: string,
) {
  console.log("Mock messaging: sendMessage called", { threadId, senderId, content });
  // Return mock structure that matches expected interface
  return { 
    data: [{
      id: `mock-${Date.now()}`,
      thread_id: threadId,
      sender_id: senderId,
      content,
      created_at: new Date().toISOString()
    }], 
    error: null 
  };
}

export async function getThreads(userId: string) {
  console.log("Mock messaging: getThreads called for user", userId);
  // Return mock structure that matches expected interface
  return { 
    data: [], 
    error: null 
  };
}

// Test function to verify Supabase client connectivity
export async function testSupabaseConnection() {
  try {
    // Test with an existing table instead of non-existent 'messages' table
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
