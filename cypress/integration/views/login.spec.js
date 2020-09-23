// TODO
// e2e test google and facebook auth tests
// Failure scenarios of google login

describe('Login E2E Tests', () => {
  beforeEach(() => {
    cy.setCookie("CookieConsent", "true")
    cy.exec('python ' + Cypress.config().createUserScript + ' -e eweuser8+login@gmail.com -n "Cypress TestLogin"')
  })

  after(() => {
    cy.exec('python ' + Cypress.config().deleteUserScript + ' -e eweuser8+login@gmail.com')
  })

  it('Logs in with username and password', () => {
    const userEmail = "eweuser8+login@gmail.com"

    cy.visit('/login')
    cy.contains('Log In')
    cy.get('[data-cy=card]').matchImageSnapshot('empty-login-form');

    cy.get('#email')
      .type(userEmail)
      .should('have.value', userEmail)

    cy.get('#password')
      .type('P4ssw0rd!')
      .should('have.value', 'P4ssw0rd!')

    cy.get('[data-cy=card]').matchImageSnapshot('complete-form');

    cy.get('[data-cy=login]').click()

    // we should be redirected to /
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })
})

describe('Login Page Form Tests', () => {
  before(() => {
    cy.exec('python ' + Cypress.config().createUserScript + ' -e eweuser8+login2@gmail.com -n "Cypress TestLogin2"')
  })

  after(() => {
    cy.exec('python ' + Cypress.config().deleteUserScript + ' -e eweuser8+login2@gmail.com')
  })

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

    cy.get('#email').type('eweuser8+login2@gmail.com')
    cy.get('#password').type('12345678')

    cy.get('[data-cy=login]').click()

    cy.contains("The email or password you provided was incorrect.")
  })
})

describe('Login Page Links', () => {
  it('Should have valid forgot password link', () => {
    cy.visit('/login')

    cy.contains("Forgot your password?").should('have.attr', 'href', '/reset')
    cy.get('[data-cy=link-signup]').should('have.attr', 'href', '/signup')
  })
})
