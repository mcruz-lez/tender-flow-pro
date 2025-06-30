import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

serve(async (req) => {
  const body = await req.json();
  const { vendorId, message } = body;
  // logic to notify vendor via Supabase or external service
  return new Response(JSON.stringify({ success: true }));
});
