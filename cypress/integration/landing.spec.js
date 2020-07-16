describe('Landing Page Tests', () => {
  beforeEach(() => {
    cy.setCookie("CookieConsent", "true")
    Cypress.config('defaultCommandTimeout', 50000);
  })

  it('Checks the Create Your List button redirects to signup page', () => {
    cy.visit('/')
    cy.contains('Create Your List').click()
    cy.url().should('include', '/signup')
  })
})
