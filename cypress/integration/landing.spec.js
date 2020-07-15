describe('Landing Page Tests', () => {
  it('Visits the landing page', () => {
    cy.visit('/')
    cy.get('h1').contains('The Gift List Tool For Parents')
    // cy.contains('The Gift List Tool For Parents')
    cy.contains('Create Your List')
  })

  it('Checks the Create Your List button redirects to signup page', () => {
    cy.visit('/')
    cy.contains('Create Your List').click()
    cy.url().should('include', '/signup')
  })
})
