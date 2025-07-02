/// <reference types="cypress" />

describe("Route Validation - All Routes Should Work", () => {
  const publicRoutes = [
    "/",
    "/login", 
    "/register",
    "/privacy-policy",
    "/terms-of-service"
  ];

  const dashboardRoutes = [
    "/contractor-dashboard",
    "/finance-dashboard", 
    "/pm-dashboard",
    "/vendor-dashboard",
    "/admin-dashboard"
  ];

  const protectedRoutes = [
    "/dashboard",
    "/dashboard/pm",
    "/dashboard/contractor", 
    "/dashboard/vendor",
    "/dashboard/finance",
    "/dashboard/admin",
    "/tenders",
    "/vendors",
    "/contracts",
    "/properties",
    "/analytics"
  ];

  publicRoutes.forEach((route) => {
    it(`should load public route ${route} without errors`, () => {
      cy.visit(route, { failOnStatusCode: false });
      cy.get("body").should("exist");
      cy.get("h1").should("contain.text", "404").should("not.exist");
    });
  });

  dashboardRoutes.forEach((route) => {
    it(`should load dashboard route ${route} (protected)`, () => {
      cy.visit(route, { failOnStatusCode: false });
      cy.get("body").should("exist");
      // Should either show login form or dashboard content, not 404
      cy.get("h1").should("contain.text", "404").should("not.exist");
    });
  });

  protectedRoutes.forEach((route) => {
    it(`should load protected route ${route}`, () => {
      cy.visit(route, { failOnStatusCode: false });
      cy.get("body").should("exist");
      cy.get("h1").should("contain.text", "404").should("not.exist");
    });
  });
});