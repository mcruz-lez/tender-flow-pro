import { supabase } from "@/integrations/supabase/client";

// API for user/org settings management
// Supabase client is disconnected. No URL or anon key present.

export async function getSetting({
  userId,
  orgId,
  key,
}: {
  userId?: string;
  orgId?: string;
  key: string;
}) {
  const { data, error } = await supabase
    .from("settings")
    .select("value")
    .eq("key", key)
    .eq(userId ? "user_id" : "organization_id", userId || orgId)
    .single();
  if (error) throw error;
  if (!data) return null;
  return data.value;
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
  const { error } = await supabase.from("settings").upsert(
    {
      user_id: userId,
      organization_id: orgId,
      key,
      value,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,organization_id,key" },
  );
  if (error) throw error;
  return true;
}
