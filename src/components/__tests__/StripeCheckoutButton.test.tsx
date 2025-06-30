import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import StripeCheckoutButton from '../StripeCheckoutButton';
import { vi } from 'vitest';

vi.mock('@stripe/stripe-js', () => ({
  loadStripe: vi.fn().mockResolvedValue({}),
}));

global.fetch = vi.fn();

describe('StripeCheckoutButton', () => {
  const priceId = 'price_123';
  const fetchMock = global.fetch as unknown as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the button', () => {
    render(<StripeCheckoutButton priceId={priceId} buttonText="Pay Now" />);
    expect(screen.getByText('Pay Now')).toBeInTheDocument();
  });

  it('shows loading and calls redirect on successful checkout', async () => {
    fetchMock.mockResolvedValueOnce({
      json: async () => ({ url: 'https://stripe.com/checkout-session' }),
    } as Response);
    const redirect = vi.fn();
    render(<StripeCheckoutButton priceId={priceId} redirect={redirect} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Processing...')).toBeInTheDocument();
    await waitFor(() => expect(redirect).toHaveBeenCalledWith('https://stripe.com/checkout-session'));
  });

  it('shows error alert on payment error', async () => {
    window.alert = vi.fn();
    fetchMock.mockResolvedValueOnce({
      json: async () => ({ error: 'Payment failed' }),
    } as Response);
    render(<StripeCheckoutButton priceId={priceId} />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(window.alert).toHaveBeenCalledWith('Payment failed'));
  });

  it('shows error alert on fetch failure', async () => {
    window.alert = vi.fn();
    fetchMock.mockRejectedValueOnce(new Error('Network error'));
    render(<StripeCheckoutButton priceId={priceId} />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(window.alert).toHaveBeenCalled());
  });
});
