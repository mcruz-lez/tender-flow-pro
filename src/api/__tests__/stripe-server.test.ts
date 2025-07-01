
// Tests for Stripe backend integration
import { beforeEach, describe, it, expect, vi } from 'vitest';

vi.mock('stripe', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      checkout: {
        sessions: {
          create: vi.fn().mockResolvedValue({ url: 'https://stripe.com/checkout-session' }),
        },
      },
      webhooks: {
        constructEvent: vi.fn((body, sig, secret) => {
          if (sig === 'sig_invalid') throw new Error('Invalid signature');
          return { type: 'checkout.session.completed' };
        }),
      },
    })),
  };
});

// Import the mock functions directly
import { createCheckoutSession, handleWebhook } from '../stripe-server';

describe('Stripe API functions', () => {
  beforeEach(() => {
    process.env.STRIPE_SECRET_KEY = 'sk_test_123';
    process.env.FRONTEND_URL = 'http://localhost:3000';
    process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test';
    vi.clearAllMocks();
  });

  it('creates a checkout session successfully', async () => {
    const result = await createCheckoutSession('price_123', 2);
    expect(result.url).toContain('checkout.stripe.com');
  });

  it('handles webhook successfully', async () => {
    const result = await handleWebhook({ type: 'checkout.session.completed' });
    expect(result.received).toBe(true);
  });
});
