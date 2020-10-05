import TestFilter from '../../support/TestFilter';

// TODO E2E tests for welcome email content (e.g. test links work correctly)
// TODO Signup tests for googlemail gmail issues.  (Prevent signup with googlemail if gmail exists and vice versa.)

TestFilter(['smoke'], () => {
  describe('Sign up E2E Test', () => {
    let user = {}

    before(() => {
      cy.fixture('auth-signup/signup-e2e.json').then(fixture => {
        user = fixture.user
        var val = Math.floor(Math.random() * 1000);
        user['email'] = "eweuser8+signup" + val + "@gmail.com"
        cy.log("User email: " + user.email)
      })
    })

    beforeEach(() => {
      cy.setCookie("CookieConsent", "true")
    })

    after(() => {
      cy.exec(Cypress.env('cleanDB') + ' -d \'' + JSON.stringify({"user_email": user.email}) + '\'').then((result) => {
        cy.log("Delete response: " + result.stdout)
      })
    })

    it('Signs up with test user email', () => {
      // Set date/time for start of test, so we can filter how we look for signup emails
      const date = new Date()

      // Complete signup form for new user
      cy.visit('/signup')
      cy.contains('Sign Up')
      cy.get('[data-cy=button-signup-with-email]').click()

      cy.get('#name').type('Test User').should('have.value', 'Test User')
      cy.get('#email').type(user.email).should('have.value', user.email)
      cy.get('#password').type(user.password).should('have.value', user.password)
      cy.get('[data-cy=button-signup-form]').click()

      // Check that welcome email is received
      cy.task("gmail:check", {
        from: Cypress.env("contactEmail"),
        to: user.email,
        subject: Cypress.env("welcomeEmailSubject"),
        after: date,
      })
      .then(email => {
        const body = email.body.html

        assert.isTrue(body.indexOf("Just a quick note to say thank you for signing up with ewelists") >= 0, "Found welcome email")
      });

      // Get confirmation code from email and complete final signup step
      cy.contains('Confirmation Code')

      cy.task("gmail:check", {
        from: Cypress.env("contactEmail"),
        to: user.email,
        subject: Cypress.env("verifyEmailSubject"),
        after: date,
      })
      .then(email => {
        const body = email.body.html

        assert.isTrue(body.indexOf("Your One Time Password (OTP) is below") >= 0, "Found reset link!")

        const code = body.match(/ [0-9]{6} /)[0].trim()

        cy.get('#confirmationCode').type(code)

        cy.get('[data-cy=confirm-signup-button]').click()
        cy.contains("Your Lists")
        cy.url().should('eq', Cypress.config().baseUrl + '/')
      });
    })
  })
})

TestFilter(['regression'], () => {
  describe('Sign up E2E Test with snapshots', () => {
    let user = {}

    before(() => {
      cy.fixture('auth-signup/signup-e2e.json').then(fixture => {
        user = fixture.user
        var val = Math.floor(Math.random() * 1000);
        user['email'] = "eweuser8+signup" + val + "@gmail.com"
        cy.log("User email: " + user.email)
      })
    })

    beforeEach(() => {
      cy.setCookie("CookieConsent", "true")
    })

    after(() => {
      cy.exec(Cypress.env('cleanDB') + ' -d \'' + JSON.stringify({"user_email": user.email}) + '\'').then((result) => {
        cy.log("Delete response: " + result.stdout)
      })
    })

    it('Signs up with test user email', () => {
      // Set date/time for start of test, so we can filter how we look for signup emails
      const date = new Date()

      // Complete signup form for new user
      cy.visit('/signup')
      cy.contains('Sign Up')
      cy.get('[data-cy=button-signup-with-email]').click()
      cy.get('[data-cy=card]').matchImageSnapshot('signup-email-form-empty')

      cy.get('#name').type('Test User').should('have.value', 'Test User')
      cy.get('#email').type(user.email).should('have.value', user.email)
      cy.get('#password').type(user.password).should('have.value', user.password)
      cy.get('[data-cy=card]').matchImageSnapshot('signup-email-form-complete', { blackout: ['#email']})
      cy.get('[data-cy=button-signup-form]').click()

      // Check that welcome email is received
      cy.task("gmail:check", {
        from: Cypress.env("contactEmail"),
        to: user.email,
        subject: Cypress.env("welcomeEmailSubject"),
        after: date,
      })
      .then(email => {
        const body = email.body.html

        assert.isTrue(body.indexOf("Just a quick note to say thank you for signing up with ewelists") >= 0, "Found welcome email")
      });

      // Get confirmation code from email and complete final signup step
      cy.contains('Confirmation Code')
      cy.get('[data-cy=card]').matchImageSnapshot('signup-confirmation-form-empty')

      cy.task("gmail:check", {
        from: Cypress.env("contactEmail"),
        to: user.email,
        subject: Cypress.env("verifyEmailSubject"),
        after: date,
      })
      .then(email => {
        const body = email.body.html

        assert.isTrue(body.indexOf("Your One Time Password (OTP) is below") >= 0, "Found reset link!")

        const code = body.match(/ [0-9]{6} /)[0].trim()

        cy.get('#confirmationCode').type(code)
        cy.get('[data-cy=card]').matchImageSnapshot('signup-confirmation-form-complete', { blackout: ['#confirmationCode']})

        cy.get('[data-cy=confirm-signup-button]').click()
        cy.contains("Your Lists")
        cy.url().should('eq', Cypress.config().baseUrl + '/')
      });
    })
  })
})

TestFilter(['regression'], () => {
  describe('Visual Snapshot Tests', () => {
    const page = 'signup';
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

    it('Should show error if password rules not matched', () => {
      cy.visit('/signup')
      cy.get('[data-cy=button-signup-with-email]').click()

      cy.get('#name').type('Test User').should('have.value', 'Test User')
      cy.get('#email').type('test@gmail.com').should('have.value', 'test@gmail.com')
      cy.get('#password').type('Abcdefg-').should('have.value', 'Abcdefg-')

      cy.get('[data-cy=button-signup-form]').click()
      cy.contains("Password does not contain any numbers.")

      cy.get('[data-cy=card]').matchImageSnapshot('signup-form-with-error')
    })
  })


  describe('Signup Form Tests', () => {
    let user = {}

    before(() => {
      cy.fixture('auth-signup/signup-e2e.json').then(fixture => {
        user = fixture.user
        var val = Math.floor(Math.random() * 1000);
        user['email'] = "eweuser8+signup" + val + "@gmail.com"
        cy.log("User email: " + user.email)
      })
    })

    beforeEach(() => {
      cy.setCookie("CookieConsent", "true")
    })

    after(() => {
      cy.exec(Cypress.env('cleanDB') + ' -d \'' + JSON.stringify({"user_email": user.email}) + '\'').then((result) => {
        cy.log("Delete response: " + result.stdout)
      })
    })

    it('Should have inactive signup button if password missing', () => {
      cy.visit('/signup')
      cy.get('[data-cy=button-signup-with-email]').click()
      cy.get('#name').type('Test User').should('have.value', 'Test User')
      cy.get('#email').type('test@gmail.com').should('have.value', 'test@gmail.com')
      cy.get('[data-cy=button-signup-form]').should('have.css', "pointer-events", "none")
    })

    it('Should have inactive signup button if email missing', () => {
      cy.visit('/signup')
      cy.get('[data-cy=button-signup-with-email]').click()
      cy.get('#name').type('Test User').should('have.value', 'Test User')
      cy.get('#password').type(user.password).should('have.value', user.password)
      cy.get('[data-cy=button-signup-form]').should('have.css', "pointer-events", "none")
    })

    it('Should have inactive signup button if name missing', () => {
      cy.visit('/signup')
      cy.get('[data-cy=button-signup-with-email]').click()
      cy.get('#email').type('test@gmail.com').should('have.value', 'test@gmail.com')
      cy.get('#password').type(user.password).should('have.value', user.password)
      cy.get('[data-cy=button-signup-form]').should('have.css', "pointer-events", "none")
    })

    it('Should have inactive signup button if password not 8 characters', () => {
      cy.visit('/signup')
      cy.get('[data-cy=button-signup-with-email]').click()
      cy.get('#name').type('Test User').should('have.value', 'Test User')
      cy.get('#email').type('test@gmail.com').should('have.value', 'test@gmail.com')
      cy.get('#password').type('1234567').should('have.value', '1234567')
      cy.get('[data-cy=button-signup-form]').should('have.css', "pointer-events", "none")
    })

    it('Should show error if password rules not matched', () => {
      cy.visit('/signup')
      cy.get('[data-cy=button-signup-with-email]').click()
      cy.get('#name').type('Test User').should('have.value', 'Test User')
      cy.get('#email').type('test@gmail.com').should('have.value', 'test@gmail.com')

      cy.get('#password').type('A-123456').should('have.value', 'A-123456')
      cy.get('[data-cy=button-signup-form]').click()
      cy.contains("Password does not contain any lower case letters.")

      cy.get('#password').clear()
      cy.get('#password').type('a-123456').should('have.value', 'a-123456')
      cy.get('[data-cy=button-signup-form]').click()
      cy.contains("Password does not contain any upper case letters.")

      cy.get('#password').clear()
      cy.get('#password').type('aA123456').should('have.value', 'aA123456')
      cy.get('[data-cy=button-signup-form]').click()
      cy.contains("Password does not contain any symbols.")

      cy.get('#password').clear()
      cy.get('#password').type('Abcdefg-').should('have.value', 'Abcdefg-')
      cy.get('[data-cy=button-signup-form]').click()
      cy.contains("Password does not contain any numbers.")
    })

    it('Should have inactive confirmation form button until form complete', () => {
      // Complete signup form for new user
      cy.visit('/signup')
      cy.contains('Sign Up')
      cy.get('[data-cy=button-signup-with-email]').click()

      cy.get('#name').type('Test User').should('have.value', 'Test User')
      cy.get('#email').type(user.email).should('have.value', user.email)
      cy.get('#password').type(user.password).should('have.value', user.password)
      cy.get('[data-cy=button-signup-form]').click()

      // confirmation code button should be inactive
      cy.contains('Confirmation Code')
      cy.get('[data-cy=confirm-signup-button]').should('have.css', "pointer-events", "none")

      // If code entered is wrong, should get error
      cy.get('#confirmationCode').type('123456')
      cy.get('[data-cy=confirm-signup-button]').click()
      cy.contains('Invalid verification code provided, please try again.')
      cy.get('[data-cy=card]').matchImageSnapshot('signup-confirmation-error');
    })
  })

  describe('Signup Page Links', () => {
    beforeEach(() => {
      cy.setCookie("CookieConsent", "true")
    })

    it('Should have valid terms, privacy and login links', () => {
      cy.visit('/signup')
      cy.get('[data-cy=link-terms]').should('have.attr', 'target', '_blank').and('have.attr', 'href', '/terms')
      cy.get('[data-cy=link-privacy]').should('have.attr', 'target', '_blank').and('have.attr', 'href', '/privacy')
      cy.get('[data-cy=link-login]').should('have.attr', 'href', '/login')
    })
  })
})
