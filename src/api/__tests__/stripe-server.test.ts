// Tests for Stripe backend integration
import { beforeEach, describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import express from 'express';

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

import router from '../stripe-server';

describe('Stripe API routes', () => {
  const app = express();
  app.use(express.json());
  app.use('/api/stripe', router);

  beforeEach(() => {
    process.env.STRIPE_SECRET_KEY = 'sk_test_123';
    process.env.FRONTEND_URL = 'http://localhost:3000';
    process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test';
    vi.clearAllMocks();
  });

  it('creates a checkout session successfully', async () => {
    const res = await request(app)
      .post('/api/stripe/create-checkout-session')
      .send({ priceId: 'price_123', quantity: 2 });
    expect(res.status).toBe(200);
    expect(res.body.url).toContain('stripe.com/checkout-session');
  });

  it('handles webhook with valid signature', async () => {
    const res = await request(app)
      .post('/api/stripe/webhook')
      .set('stripe-signature', 'sig_test')
      .send('{}');
    expect(res.status).toBe(200);
    expect(res.body.received).toBe(true);
  });

  it('returns 400 for invalid webhook signature', async () => {
    const res = await request(app)
      .post('/api/stripe/webhook')
      .set('stripe-signature', 'sig_invalid')
      .send('{}');
    expect(res.status).toBe(400);
    expect(res.text).toContain('Webhook Error: Invalid signature');
  });
});
