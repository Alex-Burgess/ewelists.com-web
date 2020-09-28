import TestFilter from '../../support/TestFilter';

TestFilter(['smoke', 'regression'], () => {
  describe('Error Page Tests', () => {
    beforeEach(() => {
      cy.setCookie("CookieConsent", "true")
    })

    it('has functioning contact link', () => {
      cy.visit('/nopage')
      cy.get('[data-cy=contact]').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/contact')
    })

    it('has functioning home page link', () => {
      cy.visit('/nopage')
      cy.get('[data-cy=home]').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/')
    })
  })
})


TestFilter(['regression'], () => {
  describe('Visual Snapshot Tests', () => {
    const page = 'error';
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
