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
        expect($window.scrollY).to.be.closeTo(780, 10);
      });
    })

    it('Checks the Learn More button scrolls correct amount for mobiles', () => {
      cy.viewport('iphone-x')
      cy.visit('/')
      cy.get('[data-cy=learn-more-button]').click()
      cy.window().then(($window) => {
        expect($window.scrollY).to.be.closeTo(780, 10);
      });
    })
  })
})
