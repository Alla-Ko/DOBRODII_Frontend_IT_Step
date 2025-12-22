/// <reference types="cypress" />
import '../support/e2e.ts';

describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io');
  });
});