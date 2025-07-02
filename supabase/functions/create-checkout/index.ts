import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CheckoutRequest {
  type: 'emd' | 'security' | 'subscription' | 'document_access' | 'one_time';
  amount?: number;
  currency?: string;
  tender_id?: string;
  contract_id?: string;
  plan_type?: 'basic' | 'professional' | 'enterprise';
  description?: string;
  metadata?: Record<string, string>;
}

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

    const user = userData.user;
    const { type, amount, currency = "usd", tender_id, contract_id, plan_type, description, metadata } = await req.json() as CheckoutRequest;

    // Check if customer exists in Stripe
    const customers = await stripe.customers.list({ email: user.email!, limit: 1 });
    let customerId: string;

    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    } else {
      // Create new customer
      const customer = await stripe.customers.create({
        email: user.email!,
        metadata: {
          user_id: user.id,
        },
      });
      customerId = customer.id;
    }

    let sessionConfig: Stripe.Checkout.SessionCreateParams;

    // Configure session based on payment type
    switch (type) {
      case 'subscription':
        const planPrices = {
          basic: 999, // $9.99/month
          professional: 2999, // $29.99/month
          enterprise: 5999, // $59.99/month
        };

        sessionConfig = {
          customer: customerId,
          line_items: [
            {
              price_data: {
                currency,
                product_data: {
                  name: `TendProcure ${plan_type?.charAt(0).toUpperCase()}${plan_type?.slice(1)} Plan`,
                  description: `Monthly subscription to TendProcure ${plan_type} features`,
                },
                unit_amount: planPrices[plan_type as keyof typeof planPrices] || 999,
                recurring: { interval: "month" },
              },
              quantity: 1,
            },
          ],
          mode: "subscription",
          metadata: {
            type,
            user_id: user.id,
            plan_type: plan_type || 'basic',
          },
        };
        break;

      case 'emd':
        if (!tender_id || !amount) {
          throw new Error("tender_id and amount required for EMD payment");
        }

        sessionConfig = {
          customer: customerId,
          line_items: [
            {
              price_data: {
                currency,
                product_data: {
                  name: "Earnest Money Deposit (EMD)",
                  description: description || `EMD for tender ${tender_id}`,
                },
                unit_amount: amount * 100, // Convert to cents
              },
              quantity: 1,
            },
          ],
          mode: "payment",
          metadata: {
            type,
            user_id: user.id,
            tender_id,
            payment_type: 'emd',
          },
        };
        break;

      case 'security':
        if (!contract_id || !amount) {
          throw new Error("contract_id and amount required for security deposit");
        }

        sessionConfig = {
          customer: customerId,
          line_items: [
            {
              price_data: {
                currency,
                product_data: {
                  name: "Security Deposit",
                  description: description || `Security deposit for contract ${contract_id}`,
                },
                unit_amount: amount * 100, // Convert to cents
              },
              quantity: 1,
            },
          ],
          mode: "payment",
          metadata: {
            type,
            user_id: user.id,
            contract_id,
            payment_type: 'security',
          },
        };
        break;

      case 'document_access':
        sessionConfig = {
          customer: customerId,
          line_items: [
            {
              price_data: {
                currency,
                product_data: {
                  name: "Document Access Fee",
                  description: description || "Access to tender documents",
                },
                unit_amount: (amount || 500) * 100, // Default $5.00
              },
              quantity: 1,
            },
          ],
          mode: "payment",
          metadata: {
            type,
            user_id: user.id,
            tender_id: tender_id || '',
            payment_type: 'document_access',
          },
        };
        break;

      default:
        sessionConfig = {
          customer: customerId,
          line_items: [
            {
              price_data: {
                currency,
                product_data: {
                  name: description || "TendProcure Payment",
                  description: "One-time payment",
                },
                unit_amount: (amount || 1000) * 100,
              },
              quantity: 1,
            },
          ],
          mode: "payment",
          metadata: {
            type: 'one_time',
            user_id: user.id,
            ...metadata,
          },
        };
    }

    // Set success and cancel URLs
    const baseUrl = req.headers.get("origin") || "http://localhost:3000";
    sessionConfig.success_url = `${baseUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`;
    sessionConfig.cancel_url = `${baseUrl}/payment-canceled`;

    // Create checkout session
    const session = await stripe.checkout.sessions.create(sessionConfig);

    // Record payment intent in database
    await supabaseClient.from("payments").insert({
      user_id: user.id,
      amount: type === 'subscription' ? 
        (sessionConfig.line_items?.[0]?.price_data?.unit_amount || 0) / 100 : 
        amount || 0,
      currency,
      status: 'pending',
      stripe_session_id: session.id,
      type,
      description: description || sessionConfig.line_items?.[0]?.price_data?.product_data?.name,
    });

    return new Response(
      JSON.stringify({ 
        url: session.url,
        session_id: session.id 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    console.error("Checkout error:", error);
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