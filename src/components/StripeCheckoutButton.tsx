import { loadStripe } from '@stripe/stripe-js';
import { useCreatePayment } from '@/hooks/usePayments';
import { useState } from 'react';
import type { Payment } from '@/integrations/supabase/types';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

interface StripeCheckoutButtonProps {
  amount: number;
  currency?: string;
  description?: string;
  type: string;
  onSuccess?: () => void;
}

export function StripeCheckoutButton({ amount, currency = 'usd', description, type, onSuccess }: StripeCheckoutButtonProps) {
  const createPayment = useCreatePayment();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    // 1. Create payment record in Supabase
    const payment = await createPayment.mutateAsync({ amount, currency, description, type, status: 'pending' } as Partial<Payment>);
    // 2. Call backend API to create Stripe Checkout session
    const res = await fetch('/api/create-stripe-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentId: (payment as Payment).id, amount, currency, description, type })
    });
    const { sessionId } = await res.json();
    // 3. Redirect to Stripe Checkout
    const stripe = await stripePromise;
    await stripe?.redirectToCheckout({ sessionId });
    setLoading(false);
    if (onSuccess) onSuccess();
  };

  return (
    <button onClick={handleCheckout} disabled={loading} className="stripe-checkout-btn">
      {loading ? 'Processing...' : 'Pay with Card'}
    </button>
  );
}
