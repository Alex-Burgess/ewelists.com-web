import TestFilter from '../../support/TestFilter';

// TODO: e2e test google and facebook auth tests
// TODO: Failure scenarios of google login

TestFilter(['smoke', 'regression'], () => {
  describe('Login E2E Tests', () => {
    var val = Math.floor(Math.random() * 1000);
    const userEmail = "eweuser8+login" + val + "@gmail.com"
    const userName = '"Test Login-E2E"'

    before(() => {
      cy.setCookie("CookieConsent", "true")
      cy.exec(Cypress.env('createUserScript') + ' -e ' + userEmail + ' -n ' + userName + ' -U ' + Cypress.env("userPoolId"))
    })

    after(() => {
      cy.exec(Cypress.env('deleteUserScript') + ' -e ' + userEmail + ' -U ' + Cypress.env("userPoolId") + ' -t ' + Cypress.env("listsTable"))
    })

    it('Logs in with username and password', () => {
      cy.visit('/login')
      cy.contains('Log In')

      cy.get('#email')
        .type(userEmail)
        .should('have.value', userEmail)

      cy.get('#password')
        .type(Cypress.env('testUserPassword'))
        .should('have.value', Cypress.env('testUserPassword'))

      cy.get('[data-cy=login]').click()

      // we should be redirected to /
      cy.url().should('eq', Cypress.config().baseUrl + '/')
    })
  })
})

TestFilter(['regression'], () => {
  describe('Visual Snapshot Tests', () => {
    var val = Math.floor(Math.random() * 1000);
    const userEmail = "eweuser8+login" + val + "@gmail.com"
    const userName = '"Test Login-Page"'
    const page = 'login';
    const sizes = Cypress.env("snapshotSizes");

    beforeEach(() => {
      cy.setCookie("CookieConsent", "true")
    })

    sizes.forEach((size) => {
      it(`Should match previous screenshot when ${size} resolution`, () => {
        cy.setCookie("CookieConsent", "true")

        if (Cypress._.isArray(size)) {
          cy.viewport(size[0], size[1])
        } else {
          cy.viewport(size)
        }

        cy.visit(`/${page}`);

        cy.get('header').invoke('css', 'position', 'relative');
        Cypress.config('defaultCommandTimeout', 50000);
        cy.matchImageSnapshot(`${page}-${size}`);
      });
    });

    it('Should match previous screenshot of completed form', () => {
      cy.visit('/login')

      cy.get('#email').type(userEmail)
      cy.get('#password').type(Cypress.env('testUserPassword'))

      cy.get('[data-cy=card]').matchImageSnapshot('complete-form');
    })

    it('Should match previous screenshot of login error', () => {
      cy.visit('/login')

      cy.get('#email').type(userEmail)
      cy.get('#password').type('12345678')

      cy.get('[data-cy=login]').click()

      cy.contains("There is no account with the email provided.")
      cy.get('[data-cy=card]').matchImageSnapshot('login-error');
    })
  })

  describe('Login Page Form Tests', () => {
    before(() => {
      cy.exec(Cypress.env('createUserScript') + ' -e ' + userEmail + ' -n ' + userName + ' -U ' + Cypress.env("userPoolId"))
    })

    after(() => {
      cy.exec(Cypress.env('deleteUserScript') + ' -e ' + userEmail + ' -U ' + Cypress.env("userPoolId") + ' -t ' + Cypress.env("listsTable"))
    })

    it('Should have inactive login button without email', () => {
      cy.visit('/login')
      cy.get('#password').type('12345678')
      cy.get('[data-cy=login]').should('have.css', "pointer-events", "none")
    })

    it('Should have inactive login button without password', () => {
      cy.visit('/login')
      cy.get('#email').type(userEmail)
      cy.get('[data-cy=login]').should('have.css', "pointer-events", "none")
    })

    it('Should show error if user does not exist', () => {
      cy.visit('/login')

      cy.get('#email').type('dummy@gmail.com')
      cy.get('#password').type('12345678')

      cy.get('[data-cy=login]').click()

      cy.contains("There is no account with the email provided.")
    })

    it('Should show error if password is wrong', () => {
      cy.visit('/login')

      cy.get('#email').type(userEmail)
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
