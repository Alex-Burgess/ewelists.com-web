describe('Cookie Banner Tests', () => {
  it('should have cookie banner', () => {
    cy.visit('/')
    cy.contains("Our website uses cookies")
    cy.get('.CookieConsent').matchImageSnapshot('cookie-banner');
  })

  it('should have link to cookie policy', () => {
    cy.visit('/')
    cy.get('[data-cy=cookie-policy-link]').click()
    cy.url().should('include', '/cookies')
  })

  it('should have accept button which closes banner', () => {
    cy.visit('/')
    cy.contains("I understand").click()
    cy.contains("Our website uses cookies").should('not.exist')
  })

  it('should not have banner after setting cookie programmatically', () => {
    cy.setCookie("CookieConsent", "true")
    cy.visit('/')
    cy.contains("Our website uses cookies").should('not.exist')
  })
})
