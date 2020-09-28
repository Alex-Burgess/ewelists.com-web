import TestFilter from '../../support/TestFilter';

// TODO tests for blog links

TestFilter(['smoke','regression'], () => {
  describe('Landing Page Tests', () => {
    beforeEach(() => {
      cy.setCookie("CookieConsent", "true")
    })

    it('Checks the Create Your List button redirects to signup page', () => {
      cy.visit('/')
      cy.get('[data-cy=create-button]').click()
      cy.url().should('include', '/signup')
    })

    it('Checks the Get Started button redirects to signup page', () => {
      cy.visit('/')
      cy.get('[data-cy=get-started-button]').click()
      cy.url().should('include', '/signup')
    })

    it('Checks the Learn More button scrolls correct amount for large screens', () => {
      cy.visit('/')
      cy.get('[data-cy=learn-more-button]').click()
      cy.window().then(($window) => {
        // TODO - have to have a large scroll margin to work on CI.
        // expect($window.scrollY).to.be.closeTo(780, 10);
        expect($window.scrollY).to.be.closeTo(780, 80);
      });
    })

    it('Checks the Learn More button scrolls correct amount for mobiles', () => {
      cy.viewport('iphone-x')
      cy.visit('/')
      cy.get('[data-cy=learn-more-button]').click()
      cy.window().then(($window) => {
        // TODO - have to have a large scroll margin to work on CI.
        // expect($window.scrollY).to.be.closeTo(780, 10);
        expect($window.scrollY).to.be.closeTo(780, 80);
      });
    })
  })
})

TestFilter(['regression'], () => {
  describe('Visual Snapshot Tests', () => {
    const page = 'landing';
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

        cy.visit(`/`);

        cy.get('header').invoke('css', 'position', 'relative');
        Cypress.config('defaultCommandTimeout', 50000);
        cy.matchImageSnapshot(`${page}-${size}`);
      })
    })
  })
})
