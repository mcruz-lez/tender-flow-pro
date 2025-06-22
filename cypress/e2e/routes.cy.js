l; /// <reference types="cypress" />

describe("TendProcure Main Navigation", () => {
  const routes = [
    "/",
    "/login",
    "/register",
    "/privacy-policy",
    "/terms-of-service",
    "/dashboard",
    "/dashboard/pm",
    "/dashboard/contractor",
    "/dashboard/vendor",
    "/dashboard/finance",
    "/dashboard/admin",
    "/tenders",
    "/tenders/create",
    "/vendors",
    "/contracts",
    "/properties",
    "/analytics",
    "/audit/logs",
    // Add more as needed
  ];

  routes.forEach((route) => {
    it(`should load ${route} (if accessible)`, () => {
      cy.visit(route);
      cy.get("body").should("exist");
    });
  });
});
