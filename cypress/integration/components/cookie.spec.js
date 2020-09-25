import TestFilter from '../../support/TestFilter';

TestFilter(['smoke', 'regression'], () => {
  describe('Cookie Banner Tests', () => {
    it('should have cookie banner with accept button', () => {
      cy.visit('/')
      cy.contains("Our website uses cookies")
      cy.contains("I understand").click()
      cy.contains("Our website uses cookies").should('not.exist')
    })

    it('should have link to cookie policy', () => {
      cy.visit('/')
      cy.get('[data-cy=cookie-policy-link]').click()
      cy.url().should('include', '/cookies')
    })
  })
})


TestFilter(['regression'], () => {
  describe('Cookie Banner Tests', () => {
    it('should match image snapshot', () => {
      cy.visit('/')
      cy.get('.CookieConsent').matchImageSnapshot('cookie-banner');
    })

    it('should not have banner after setting cookie programmatically', () => {
      cy.setCookie("CookieConsent", "true")
      cy.visit('/')
      cy.contains("Our website uses cookies").should('not.exist')
    })
  })
})
