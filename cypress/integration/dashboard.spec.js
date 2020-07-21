describe('Dashboard Page Tests', () => {
  before(() => {
    cy.exec('python ' + Cypress.config().createUserScript + ' -e eweuser8+dashboard@gmail.com -n "Cypress TestDashboard"')
    cy.login('eweuser8+dashboard@gmail.com', 'P4ssw0rd!')
  })

  after(() => {
    cy.exec('python ' + Cypress.config().deleteUserScript + ' -e eweuser8+dashboard@gmail.com')
  })

  it('visits dashboard as authenticated user', () => {
    cy.visit('/')
    cy.contains("Your Lists")
  })
})
