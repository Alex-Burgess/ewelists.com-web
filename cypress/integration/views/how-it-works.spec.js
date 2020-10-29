import TestFilter from '../../support/TestFilter';

TestFilter(['smoke','regression'], () => {
  describe('How it Works Page Tests', () => {
    beforeEach(() => {
      cy.setCookie("CookieConsent", "true")
    })

    it('Checks the Get Started button redirects to signup page', () => {
      cy.visit('/how-it-works')
      cy.get('[data-cy=button-get-started]').click()
      cy.url().should('include', '/signup')
    })
  })
})

TestFilter(['regression'], () => {
  describe('Visual Snapshot Tests', () => {
    const page = 'how-it-works';
    const sizes = Cypress.env("snapshotSizes");

    beforeEach(() => {
      cy.setCookie("CookieConsent", "true")
    })

    sizes.forEach((size) => {
      it(`Should match previous screenshot when ${size} resolution`, () => {
        cy.setCookie("CookieConsent", "true")

        if (Cypress._.isArray(size)) {
          cy.viewport(size[0], size[1])
        } else {
          cy.viewport(size)
        }

        cy.visit(`/${page}`);

        cy.get('header').invoke('css', 'position', 'relative');
        Cypress.config('defaultCommandTimeout', 50000);
        cy.matchImageSnapshot(`${page}-${size}`);
      });
    });
  })
})
