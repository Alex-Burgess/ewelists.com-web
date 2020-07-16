describe('Dashboard Page Tests', () => {
  before(() => {
    cy.login(Cypress.config().testUser1, Cypress.config().testUser1_password)
  })

  it('visits dashboard as authenticated user', () => {
    cy.visit('/')
    cy.contains("Your Lists")
  })
})
