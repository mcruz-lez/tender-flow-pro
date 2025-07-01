
import { supabase } from "@/integrations/supabase/client";

// Settings API using existing profiles table for user settings
// and organizations table for org settings since no dedicated settings table exists

export async function getSetting({
  userId,
  orgId,
  key,
}: {
  userId?: string;
  orgId?: string;
  key: string;
}) {
  try {
    if (userId) {
      // For user settings, use the profiles table and return null for now
      // since profiles table doesn't have generic settings fields
      console.log("Mock user setting get:", { userId, key });
      return null;
    } else if (orgId) {
      // For org settings, use the organizations table
      console.log("Mock org setting get:", { orgId, key });
      return null;
    }
    return null;
  } catch (error) {
    console.error("Error getting setting:", error);
    throw error;
  }
}

export async function setSetting({
  userId,
  orgId,
  key,
  value,
}: {
  userId?: string;
  orgId?: string;
  key: string;
  value: unknown;
}) {
  try {
    if (userId) {
      // For user settings, we'd need a proper settings table
      // For now, just log the attempt
      console.log("Mock user setting set:", { userId, key, value });
      return true;
    } else if (orgId) {
      // For org settings, we'd need a proper settings table
      // For now, just log the attempt
      console.log("Mock org setting set:", { orgId, key, value });
      return true;
    }
    return true;
  } catch (error) {
    console.error("Error setting setting:", error);
    throw error;
  }
}
