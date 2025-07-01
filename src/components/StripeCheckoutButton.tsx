
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

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
      // Mock checkout for now since we don't have actual Stripe integration
      console.log("Mock Stripe checkout:", { priceId, amount, currency, description, type });
      
      // Simulate success
      setTimeout(() => {
        if (onSuccess) onSuccess();
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error("Payment error:", err);
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
