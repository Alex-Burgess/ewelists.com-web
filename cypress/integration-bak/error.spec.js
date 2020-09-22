describe('Error Page Tests', () => {
  beforeEach(() => {
    cy.setCookie("CookieConsent", "true")
  })

  it('clicks on contact link', () => {
    cy.visit('/nopage')
    cy.get('[data-cy=contact]').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/contact')
  })

  it('clicks on home page link', () => {
    cy.visit('/nopage')
    cy.get('[data-cy=home]').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })
})
