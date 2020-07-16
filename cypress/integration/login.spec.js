// TODO
// Automate user creation and deletion
// e2e test google and facebook auth tests
// Failure scenarios of google login

describe('Login E2E Tests', () => {
  beforeEach(() => {
    cy.setCookie("CookieConsent", "true")
  })
  
  it('Logs in with username and password', () => {
    cy.visit('/login')
    cy.contains('Log In')
    cy.get('[data-cy=card]').matchImageSnapshot('empty-login-form');

    cy.get('#email')
      .type(Cypress.config().testUser1)
      .should('have.value', Cypress.config().testUser1)

    cy.get('#password')
      .type(Cypress.config().testUser1_password)
      .should('have.value', Cypress.config().testUser1_password)

    cy.get('[data-cy=card]').matchImageSnapshot('complete-form');

    cy.get('[data-cy=login]').click()

    // we should be redirected to /
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })
})

describe('Login Page Form Tests', () => {
  it('Should have inactive login button without email', () => {
    cy.visit('/login')
    cy.get('#password').type('12345678')
    cy.get('[data-cy=login]').should('have.css', "pointer-events", "none")
  })

  it('Should have inactive login button without password', () => {
    cy.visit('/login')
    cy.get('#email').type('dummy@gmail.com')
    cy.get('[data-cy=login]').should('have.css', "pointer-events", "none")
  })

  it('Should show error if user does not exist', () => {
    cy.visit('/login')

    cy.get('#email').type('dummy@gmail.com')
    cy.get('#password').type('12345678')

    cy.get('[data-cy=login]').click()

    cy.contains("There is no account with the email provided.")
    cy.get('[data-cy=card]').matchImageSnapshot('login-error');
  })

  it('Should show error if password is wrong', () => {
    cy.visit('/login')

    cy.get('#email').type(Cypress.config().testUser1)
    cy.get('#password').type('12345678')

    cy.get('[data-cy=login]').click()

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

    cy.get('[data-cy=signup]').click()
    cy.url().should('include', '/signup')
  })
})
