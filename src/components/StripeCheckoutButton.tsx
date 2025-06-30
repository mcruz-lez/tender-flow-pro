import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

interface StripeCheckoutButtonProps {
  priceId: string;
  quantity?: number;
  buttonText?: string;
  redirect?: (url: string) => void;
}

export function StripeCheckoutButton({
  priceId,
  quantity = 1,
  buttonText = "Pay with Card",
  redirect,
}: StripeCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      // Call backend API to create Stripe Checkout session
      const res = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, quantity }),
      });
      const { url, error } = await res.json();
      if (url) {
        const stripe = await stripePromise;
        (redirect || window.location.assign)(url);
      } else {
        alert(error || "Payment error");
      }
    } catch (err) {
      alert("Payment error");
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="stripe-checkout-btn"
    >
      {loading ? "Processing..." : buttonText}
    </button>
  );
}

export default StripeCheckoutButton;
