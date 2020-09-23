import TestFilter from '../../support/TestFilter';

TestFilter(['regression'], () => {
  describe('Footer Grey Tests', () => {
    beforeEach(() => {
      cy.setCookie("CookieConsent", "true")
      cy.task('resetCRI').visit('/contact')
    })

    it('Should have correct footer links', () => {
      cy.get('[data-cy=footer-grey-link-privacy]').should('have.attr', 'href', '/privacy')
      cy.get('[data-cy=footer-grey-link-terms]').should('have.attr', 'href', '/terms')
      cy.get('[data-cy=footer-grey-link-contact]').should('have.attr', 'href', '/contact')
      cy.get('[data-cy=footer-grey-link-copy]').should('have.attr', 'href', '/')
    })

    it('Should change font-weight on links from 500 to 600 with hover', () => {
      cy.get('[data-cy=footer-grey-link-privacy]').should('have.css', "font-weight", "500")
      cy.task('activateHoverPseudo', { selector: '[data-cy=footer-grey-link-privacy]' })
      cy.get('[data-cy=footer-grey-link-privacy]').should('have.css', "font-weight", "600")
    })
  })

  describe('Footer Dark Tests', () => {
    beforeEach(() => {
      cy.setCookie("CookieConsent", "true")
      cy.task('resetCRI').visit('/')
    })

    it('Should have correct social links', () => {
      cy.get('[data-cy=footer-dark-link-facebook]').should('have.attr', 'href', 'https://www.facebook.com/ewelists').and('have.attr', 'target', '_blank')
      cy.get('[data-cy=footer-dark-link-instagram]').should('have.attr', 'href', 'https://www.instagram.com/ewelists/').and('have.attr', 'target', '_blank')
    })

    it('Should have correct about links', () => {
      cy.get('[data-cy=footer-dark-link-ideas]').should('have.attr', 'href', '/list-ideas')
      cy.get('[data-cy=footer-dark-link-about]').should('have.attr', 'href', '/about')
      cy.get('[data-cy=footer-dark-link-contact]').should('have.attr', 'href', '/contact')
    })

    it('Should have correct legal links', () => {
      cy.get('[data-cy=footer-dark-link-privacy]').should('have.attr', 'href', '/privacy')
      cy.get('[data-cy=footer-dark-link-terms]').should('have.attr', 'href', '/terms')
      cy.get('[data-cy=footer-dark-link-cookies]').should('have.attr', 'href', '/cookies')
    })

    it('Should change font-weight on links from 400 to 500 with hover', () => {
      cy.get('[data-cy=footer-dark-link-ideas]').should('have.css', "font-weight", "400")
      cy.task('activateHoverPseudo', { selector: '[data-cy=footer-dark-link-ideas]' })
      cy.get('[data-cy=footer-dark-link-ideas]').should('have.css', "font-weight", "500")
    })
  })
})
