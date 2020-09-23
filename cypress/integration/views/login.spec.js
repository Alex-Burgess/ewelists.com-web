import TestFilter from '../../support/TestFilter';

// TODO: e2e test google and facebook auth tests
// TODO: Failure scenarios of google login

TestFilter(['smoke', 'regression'], () => {
  describe('Login E2E Tests', () => {
    const userName = '"Test Login-E2E"'

    before(() => {
      cy.setCookie("CookieConsent", "true")
      cy.exec(Cypress.env('createUserScript') + ' -e ' + Cypress.env('testUserEmail') + ' -n ' + userName + ' -U ' + Cypress.env("userPoolId"))
    })

    after(() => {
      cy.exec(Cypress.env('deleteUserScript') + ' -e ' + Cypress.env('testUserEmail') + ' -U ' + Cypress.env("userPoolId") + ' -t ' + Cypress.env("listsTable"))
    })

    it('Logs in with username and password', () => {
      cy.visit('/login')
      cy.contains('Log In')
      cy.get('[data-cy=card]').matchImageSnapshot('empty-login-form');

      cy.get('#email')
        .type(Cypress.env('testUserEmail'))
        .should('have.value', Cypress.env('testUserEmail'))

      cy.get('#password')
        .type(Cypress.env('testUserPassword'))
        .should('have.value', Cypress.env('testUserPassword'))

      cy.get('[data-cy=card]').matchImageSnapshot('complete-form');

      cy.get('[data-cy=login]').click()

      // we should be redirected to /
      cy.url().should('eq', Cypress.config().baseUrl + '/')
    })
  })
})

TestFilter(['regression'], () => {
  const userName = '"Test Login-Page"'

  describe('Login Page Form Tests', () => {
    before(() => {
      cy.exec(Cypress.env('createUserScript') + ' -e ' + Cypress.env('testUserEmail') + ' -n ' + userName + ' -U ' + Cypress.env("userPoolId"))
    })

    after(() => {
      cy.exec(Cypress.env('deleteUserScript') + ' -e ' + Cypress.env('testUserEmail') + ' -U ' + Cypress.env("userPoolId") + ' -t ' + Cypress.env("listsTable"))
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

      cy.get('#email').type(Cypress.env('testUserEmail'))
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
})
