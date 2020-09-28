import TestFilter from '../support/TestFilter';

const pages = [
  ['about', 'About Ewelists'],
  ['contact', 'Send us a message'],
  ['cookies', 'How We Use Cookies'],
  ['error', 'Oops'],
  ['landing', 'The Gift List Tool For Parents'],
  ['list-ideas', 'Gift List Ideas'],
  ['login', 'Log in'],
  ['privacy', 'Privacy Policy'],
  ['reset', 'Reset Password'],
  ['signup', 'Sign Up'],
  ['terms', 'Terms of Service'],
];

TestFilter(['smoke', 'regression'], () => {
  describe('Public Route Tests', () => {
    pages.forEach((page) => {
      it(`Should load ${page[0]} Page and contain header`, () => {
        cy.setCookie("CookieConsent", "true")

        if (page[0] === 'landing' ) {
          cy.visit('/');
          cy.url().should('eq', Cypress.config().baseUrl + `/`)
          cy.contains(page[1])
        } else {
          cy.visit(`/${page[0]}`);
          cy.url().should('eq', Cypress.config().baseUrl + `/${page[0]}`)
          cy.contains(page[1])
        }
      });
    });
  });
})
