// e2e test google and facebook auth tests
// Failure scenarios of google login
// Test programtic login, which will underpin future tests - see https://docs.cypress.io/guides/getting-started/testing-your-app.html#Logging-in

describe('Login E2E Tests', () => {
  it('Logs in with username and password', () => {
    cy.visit('/login')
    cy.contains('Log In')

    cy.get('#email')
      .type(Cypress.config().testUser1)
      .should('have.value', Cypress.config().testUser1)

    cy.get('#password')
      .type(Cypress.config().testUser1_password)
      .should('have.value', Cypress.config().testUser1_password)

    cy.get('#login').click()

    // we should be redirected to /
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })
})

describe('Login Page Form Tests', () => {
  it('Should have inactive login button until form complete', () => {
    cy.visit('/login')

    // Starts off inactive
    cy.get('#login').should('have.class', "makeStyles-disabled-341")
    cy.get('#login').should('have.css', "pointer-events", "none")

    // Still inactive after email
    cy.get('#email').type('dummy@gmail.com')
    cy.get('#login').should('have.class', "makeStyles-disabled-341")
    cy.get('#login').should('have.css', "pointer-events", "none")

    // Active after password
    cy.get('#password').type('12345678')
    cy.get('#login').should('not.have.class', "makeStyles-disabled-341")
    cy.get('#login').should('have.css', "pointer-events", "auto")

    // Inactive again if just password
    cy.get('#email').clear()
    cy.get('#login').should('have.class', "makeStyles-disabled-341")
    cy.get('#login').should('have.css', "pointer-events", "none")
  })

  it('Should show error if user does not exist', () => {
    cy.visit('/login')

    cy.get('#email').type('dummy@gmail.com')
    cy.get('#password').type('12345678')

    cy.get('#login').click()

    cy.contains("There is no account with the email provided.")
  })

  it('Should show error if password is wrong', () => {
    cy.visit('/login')

    cy.get('#email').type(Cypress.config().testUser1)
    cy.get('#password').type('12345678')

    cy.get('#login').click()

    cy.contains("The email or password you provided was incorrect.")
  })
})

describe('Login Page Links', () => {
  it('Should have valid forgot password link', () => {
    cy.visit('/login')

    cy.contains("Forgot your password?").click()
    cy.url().should('include', '/login/reset')
  })

  it('Should have valid Sign Up link', () => {
    cy.visit('/login')

    cy.get('#no_account').contains("Sign Up").click()
    cy.url().should('include', '/signup')
  })
})
