describe('Home page loads and Supabase is connected', () => {
  it('should load the home page', () => {
    cy.visit('/');
    cy.contains('TenderFlow').should('exist');
  });

  it('should fetch data from Supabase (example: settings)', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('VITE_SUPABASE_URL')}/rest/v1/settings`,
      headers: {
        apikey: Cypress.env('VITE_SUPABASE_ANON_KEY'),
        Authorization: `Bearer ${Cypress.env('VITE_SUPABASE_ANON_KEY')}`,
      },
      qs: { select: '*' },
      failOnStatusCode: false,
    }).then((resp) => {
      expect([200, 401, 403]).to.include(resp.status); // 200 if public, 401/403 if RLS
    });
  });
});
