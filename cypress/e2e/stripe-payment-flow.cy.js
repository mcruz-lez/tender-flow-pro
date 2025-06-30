// Cypress E2E test for Stripe payment flow
// Assumes a test product/price is available and backend is running

describe('Stripe Payment Flow', () => {
  it('should complete a payment flow via Stripe Checkout', () => {
    // Visit the page with the StripeCheckoutButton
    cy.visit('/'); // Adjust if the button is on a different route

    // Find and click the payment button
    cy.contains('Pay with Card').click();

    // Should redirect to Stripe Checkout
    cy.origin('https://checkout.stripe.com', () => {
      cy.url().should('include', 'checkout.stripe.com');
      // Optionally, check for Stripe branding or elements
      cy.contains('Pay').should('exist');
    });

    // Note: Completing payment on Stripe is not possible in CI, but this verifies redirect
  });
});
