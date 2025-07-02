
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

interface StripeCheckoutButtonProps {
  priceId?: string;
  amount?: number;
  currency?: string;
  description?: string;
  type?: string;
  quantity?: number;
  buttonText?: string;
  redirect?: (url: string) => void;
  onSuccess?: () => void;
}

export function StripeCheckoutButton({
  priceId,
  amount,
  currency = "usd",
  description = "Payment",
  type = "payment",
  quantity = 1,
  buttonText = "Pay with Card",
  redirect,
  onSuccess,
}: StripeCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: {
          type: type || 'one_time',
          amount,
          currency,
          description,
          metadata: { priceId }
        }
      });
      
      if (error) throw error;
      
      if (data?.url) {
        window.open(data.url, '_blank');
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="stripe-checkout-btn bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
    >
      {loading ? "Processing..." : buttonText}
    </button>
  );
}

export default StripeCheckoutButton;
