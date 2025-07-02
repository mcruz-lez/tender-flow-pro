import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Stripe
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY is not configured");
    }
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get authenticated user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header provided");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError || !userData.user) {
      throw new Error("User not authenticated");
    }

    const { session_id } = await req.json();
    if (!session_id) {
      throw new Error("session_id is required");
    }

    // Retrieve checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);

    // Update payment status in database
    const { error: updateError } = await supabaseClient
      .from("payments")
      .update({
        status: session.payment_status === 'paid' ? 'succeeded' : session.payment_status || 'failed',
        stripe_payment_intent_id: session.payment_intent as string,
        updated_at: new Date().toISOString(),
      })
      .eq('stripe_session_id', session_id)
      .eq('user_id', userData.user.id);

    if (updateError) {
      console.error("Error updating payment:", updateError);
    }

    // Handle specific payment types
    const metadata = session.metadata;
    if (metadata?.type === 'emd' && session.payment_status === 'paid') {
      // Record EMD payment
      await supabaseClient.from("emd_payments").insert({
        tender_id: metadata.tender_id,
        vendor_id: userData.user.id, // This should be the vendor record ID
        amount: (session.amount_total || 0) / 100,
        status: 'succeeded',
        stripe_payment_intent_id: session.payment_intent as string,
      });
    }

    if (metadata?.type === 'security' && session.payment_status === 'paid') {
      // Record security deposit
      await supabaseClient.from("security_deposits").insert({
        contract_id: metadata.contract_id,
        vendor_id: userData.user.id, // This should be the vendor record ID
        amount: (session.amount_total || 0) / 100,
        status: 'succeeded',
        stripe_payment_intent_id: session.payment_intent as string,
      });
    }

    if (metadata?.type === 'subscription' && session.payment_status === 'paid') {
      // Update subscription preferences
      await supabaseClient.from("subscription_preferences").upsert({
        user_id: userData.user.id,
        plan_type: metadata.plan_type || 'basic',
        features: {},
        updated_at: new Date().toISOString(),
      });
    }

    return new Response(
      JSON.stringify({ 
        session,
        payment_status: session.payment_status,
        success: session.payment_status === 'paid'
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    console.error("Payment verification error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error" 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});