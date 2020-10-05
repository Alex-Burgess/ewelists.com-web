import TestFilter from '../../support/TestFilter';

// TODO: e2e test google and facebook auth tests
// TODO: Failure scenarios of google login

TestFilter(['smoke', 'regression'], () => {
  describe('Login E2E Tests', () => {
    let seedResponse = {}
    let user = {}

    before(() => {
      cy.fixture('auth-login/login-e2e.json').then(fixture => {
        user = fixture.user
        cy.log("User email: " + user.email)
      })

      cy.exec(Cypress.env('seedDB') + ' -f cypress/fixtures/auth-login/login-e2e.json').then((result) => {
        seedResponse = JSON.parse(result.stdout)
        cy.log("User ID: " + seedResponse.user_id)
      })
    })

    after(() => {
      seedResponse['user_email'] = user.email
      cy.exec(Cypress.env('cleanDB') + ' -d \'' + JSON.stringify(seedResponse) + '\'').then((result) => {
        cy.log("Delete response: " + result.stdout)
      })
    })

    it('Logs in with username and password', () => {
      cy.visit('/login')
      cy.contains('Log In')

      cy.get('#email')
        .type(user.email)
        .should('have.value', user.email)

      cy.get('#password')
        .type(user.password)
        .should('have.value', user.password)

      cy.get('[data-cy=login]').click()

      // we should be redirected to /
      cy.url().should('eq', Cypress.config().baseUrl + '/')
    })
  })
})

TestFilter(['regression'], () => {
  describe('Visual Snapshot Tests', () => {
    let user = {}

    before(() => {
      cy.fixture('auth-login/snapshot.json').then(fixture => {
        user = fixture.user
        cy.log("User email: " + user.email)
      })
    })

    beforeEach(() => {
      cy.setCookie("CookieConsent", "true")
    })

    const page = 'login';
    const sizes = Cypress.env("snapshotSizes");
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

      cy.get('#email').type(user.email)
      cy.get('#password').type(user.password)

      cy.get('[data-cy=card]').matchImageSnapshot('complete-form', { blackout: ['#email']});
    })

    it('Should match previous screenshot of login error', () => {
      cy.visit('/login')

      cy.get('#email').type('eweuser8+missing@gmail.com')
      cy.get('#password').type('12345678')

      cy.get('[data-cy=login]').click()

      cy.contains("There is no account with the email provided.")
      cy.get('[data-cy=card]').matchImageSnapshot('login-error', { blackout: ['#email']});
    })
  })

  describe('Login Page Form Tests', () => {
    let seedResponse = {}
    let user = {}

    before(() => {
      cy.fixture('auth-login/login-e2e.json').then(fixture => {
        user = fixture.user
        cy.log("User email: " + user.email)
      })

      cy.exec(Cypress.env('seedDB') + ' -f cypress/fixtures/auth-login/login-e2e.json').then((result) => {
        seedResponse = JSON.parse(result.stdout)
        cy.log("User ID: " + seedResponse.user_id)
      })
    })

    after(() => {
      seedResponse['user_email'] = user.email
      cy.exec(Cypress.env('cleanDB') + ' -d \'' + JSON.stringify(seedResponse) + '\'').then((result) => {
        cy.log("Delete response: " + result.stdout)
      })
    })

    it('Should have inactive login button without email', () => {
      cy.visit('/login')
      cy.get('#password').type('12345678')
      cy.get('[data-cy=login]').should('have.css', "pointer-events", "none")
    })

    it('Should have inactive login button without password', () => {
      cy.visit('/login')
      cy.get('#email').type(user.email)
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

      cy.get('#email').type(user.email)
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
