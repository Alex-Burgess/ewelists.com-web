import TestFilter from '../../support/TestFilter';

TestFilter(['smoke'], () => {
  describe('Reset password E2E Test', () => {
    let seedResponse = {}
    let user = {}

    before(() => {
      cy.fixture('auth-reset/reset-e2e.json').then(fixture => {
        user = fixture.user
        cy.log("User email: " + user.email)
      })

      cy.exec(Cypress.env('seedDB') + ' -f cypress/fixtures/auth-reset/reset-e2e.json').then((result) => {
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

    it('resets password for test user', () => {
      cy.visit('/reset')
      cy.contains('Reset')

      cy.get('#email').type(user.email)
      cy.get('[data-cy=submit-reset]').click()

      cy.contains('Confirmation Code')

      // Get the confirmation code from email
      cy.task("gmail:check", {
        from: Cypress.env("contactEmail"),
        to: user.email,
        subject: Cypress.env("verifyEmailSubject"),
        after: new Date(),
      })
      .then(email => {
        cy.log("Email body: " + JSON.stringify(email.body))
        const body = email.body.html

        assert.isTrue(body.indexOf("Your One Time Password (OTP) is below") >= 0, "Email contained One Time Password.");

        const code = body.match(/ [0-9]{6} /)[0].trim()

        cy.get('#code').type(code)
        cy.get('#password').type(user.password)
        cy.get('#confirmPassword').type(user.password)

        cy.get('[data-cy=submit-verify]').click()
        cy.contains('Password Reset Complete')

        cy.contains("Login with your new credentials").click()
        cy.url().should('include', '/login')
      });
    })
  })
})

TestFilter(['regression'], () => {
  describe('Reset password E2E Test with snapshots', () => {
    let seedResponse = {}
    let user = {}

    before(() => {
      cy.fixture('auth-reset/reset-e2e-snapshot.json').then(fixture => {
        user = fixture.user
        cy.log("User email: " + user.email)
      })

      cy.exec(Cypress.env('seedDB') + ' -f cypress/fixtures/auth-reset/reset-e2e-snapshot.json').then((result) => {
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

    it('resets password for test user', () => {
      cy.visit('/reset')
      cy.contains('Reset')

      cy.get('#email').type(user.email)
      cy.get('[data-cy=card]').matchImageSnapshot('complete-reset-form');
      cy.get('[data-cy=submit-reset]').click()

      cy.contains('Confirmation Code')
      cy.get('[data-cy=card]').matchImageSnapshot('empty-confirmation-form');

      // Get the confirmation code from email
      cy.task("gmail:check", {
        from: Cypress.env("contactEmail"),
        to: user.email,
        subject: Cypress.env("verifyEmailSubject"),
        after: new Date(),
      })
      .then(email => {
        cy.log("Email body: " + JSON.stringify(email.body))
        const body = email.body.html

        assert.isTrue(body.indexOf("Your One Time Password (OTP) is below") >= 0, "Email contained One Time Password.");

        const code = body.match(/ [0-9]{6} /)[0].trim()

        cy.get('#code').type(code)
        cy.get('#password').type(user.password)
        cy.get('#confirmPassword').type(user.password)
        cy.get('[data-cy=card]').matchImageSnapshot('complete-confirmation-form', { blackout: ['#code']});

        cy.get('[data-cy=submit-verify]').click()
        cy.contains('Password Reset Complete')
        cy.get('[data-cy=card]').matchImageSnapshot('reset-complete-form');

        cy.contains("Login with your new credentials").click()
        cy.url().should('include', '/login')
      });
    })
  })
})


TestFilter(['regression'], () => {
  describe('Visual Snapshot Tests', () => {
    beforeEach(() => {
      cy.setCookie("CookieConsent", "true")
    })

    const page = 'reset';
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
  })


  describe('Reset Form Tests', () => {
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

    beforeEach(() => {
      cy.setCookie("CookieConsent", "true")
    })

    it('Should have inactive reset form button with email', () => {
      cy.visit('/reset')
      cy.get('[data-cy=submit-reset]').should('have.css', "pointer-events", "none")
    })

    it('Should show message if reset form has error', () => {
      cy.visit('/reset')

      cy.get('#email').type('nouser@gmail.com')
      cy.get('[data-cy=submit-reset]').click()

      cy.contains('Incorrect username.')
      cy.get('[data-cy=card]').matchImageSnapshot('reset-error');
    })

    it('Should error if confirmation code is wrong', () => {
      cy.visit('/reset')

      cy.get('#email').type(user.email)
      cy.get('[data-cy=submit-reset]').click()
      cy.contains('Confirmation Code')

      cy.get('#code').type('123456')
      cy.get('[data-cy=submit-verify]').should('have.css', "pointer-events", "none")

      cy.get('#password').type(user.password)
      cy.get('[data-cy=submit-verify]').should('have.css', "pointer-events", "none")

      cy.get('#confirmPassword').type(user.password)
      cy.get('[data-cy=submit-verify]').should('have.css', "pointer-events", "auto")

      cy.get('[data-cy=submit-verify]').click()
      cy.contains('Invalid verification code provided, please try again.')
      cy.get('[data-cy=card]').matchImageSnapshot('confirmation-error');
    })

    it('Should error if password rules not matched', () => {
      const date = new Date();

      cy.visit('/reset')
      cy.get('#email').type(user.email)
      cy.get('[data-cy=submit-reset]').click()
      cy.contains('Confirmation Code')

      cy.task("gmail:check", {
        from: Cypress.env("contactEmail"),
        to: user.email,
        subject: Cypress.env("verifyEmailSubject"),
        after: date,
      })
      .then(email => {
        const body = email.body.html

        assert.isTrue(body.indexOf("Your One Time Password (OTP) is below") >= 0, "Found reset link");

        const code = body.match(/ [0-9]{6} /)[0].trim()
        cy.get('#code').type(code)

        cy.get('#password').type('A-123456').should('have.value', 'A-123456')
        cy.get('#confirmPassword').type('A-123456').should('have.value', 'A-123456')
        cy.get('[data-cy=submit-verify]').click()
        cy.contains("Password does not contain any lower case letters.")

        cy.get('#password').clear()
        cy.get('#confirmPassword').clear()
        cy.get('#password').type('a-123456').should('have.value', 'a-123456')
        cy.get('#confirmPassword').type('a-123456').should('have.value', 'a-123456')
        cy.get('[data-cy=submit-verify]').click()
        cy.contains("Password does not contain any upper case letters.")

        cy.get('#password').clear()
        cy.get('#confirmPassword').clear()
        cy.get('#password').type('aA123456').should('have.value', 'aA123456')
        cy.get('#confirmPassword').type('aA123456').should('have.value', 'aA123456')
        cy.get('[data-cy=submit-verify]').click()
        cy.contains("Password does not contain any symbols.")

        cy.get('#password').clear()
        cy.get('#confirmPassword').clear()
        cy.get('#password').type('Abcdefg-').should('have.value', 'Abcdefg-')
        cy.get('#confirmPassword').type('Abcdefg-').should('have.value', 'Abcdefg-')
        cy.get('[data-cy=submit-verify]').click()
        cy.contains("Password does not contain any numbers.")

        cy.get('#password').clear()
        cy.get('#confirmPassword').clear()
        cy.get('#password').type(user.password).should('have.value', user.password)
        cy.get('#confirmPassword').type('P4ssw0rd-').should('have.value', 'P4ssw0rd-')
        cy.get('[data-cy=submit-verify]').click()
        cy.contains("Your confirmed password does not match the new password.")
      });
    })
  })
})
