// API for user/org settings management
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export async function getSetting({ userId, orgId, key }: { userId?: string; orgId?: string; key: string }) {
  const { data, error } = await supabase
    .from('settings')
    .select('value')
    .eq('key', key)
    .eq(userId ? 'user_id' : 'organization_id', userId || orgId)
    .single();
  if (error) throw error;
  return data?.value;
}

export async function setSetting({ userId, orgId, key, value }: { userId?: string; orgId?: string; key: string; value: any }) {
  const { error } = await supabase
    .from('settings')
    .upsert({
      user_id: userId,
      organization_id: orgId,
      key,
      value,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id,organization_id,key' });
  if (error) throw error;
  return true;
}
