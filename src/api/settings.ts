import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

// Settings type based on our new database schema
type Setting = Tables<"settings">;
type SettingInsert = TablesInsert<"settings">;

export async function getSetting({
  userId,
  key,
}: {
  userId: string;
  key: string;
}) {
  try {
    const { data, error } = await supabase
      .from("settings")
      .select("*")
      .eq("user_id", userId)
      .eq("key", key)
      .maybeSingle();
    
    if (error) throw error;
    return data?.value || null;
  } catch (error) {
    console.error("Error getting setting:", error);
    throw error;
  }
}

export async function setSetting({
  userId,
  key,
  value,
}: {
  userId: string;
  key: string;
  value: unknown;
}) {
  try {
    const settingData: SettingInsert = {
      user_id: userId,
      key,
      value: value as any // JSONB can store any JSON value
    };

    const { data, error } = await supabase
      .from("settings")
      .upsert(settingData, {
        onConflict: "user_id,key"
      })
      .select()
      .single();
    
    if (error) throw error;
    return data as Setting;
  } catch (error) {
    console.error("Error setting setting:", error);
    throw error;
  }
}

export async function getAllUserSettings(userId: string) {
  try {
    const { data, error } = await supabase
      .from("settings")
      .select("*")
      .eq("user_id", userId);
    
    if (error) throw error;
    
    // Convert to key-value object for easier use
    const settings: Record<string, unknown> = {};
    data?.forEach((setting: Setting) => {
      settings[setting.key] = setting.value;
    });
    
    return settings;
  } catch (error) {
    console.error("Error getting all user settings:", error);
    throw error;
  }
}

export async function deleteSetting({
  userId,
  key,
}: {
  userId: string;
  key: string;
}) {
  try {
    const { error } = await supabase
      .from("settings")
      .delete()
      .eq("user_id", userId)
      .eq("key", key);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error deleting setting:", error);
    throw error;
  }
}