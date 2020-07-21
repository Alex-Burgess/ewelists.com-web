// TODO E2E tests for welcome email content (e.g. test links work correctly)

describe('Sign up E2E Test', () => {
  beforeEach(() => {
    cy.setCookie("CookieConsent", "true")
  })

  after(() => {
    // Clean up new user that was created.
    cy.exec('python ' + Cypress.config().deleteUserScript + ' -e eweuser8+signup@gmail.com')
  })

  it('Signs up with test user email', () => {
    // Set date/time for start of test, so we can filter how we look for signup emails
    const date = new Date()

    const userEmail = "eweuser8+signup@gmail.com"

    // Complete signup form for new user
    cy.visit('/signup')
    cy.contains('Sign Up')
    cy.get('[data-cy=button-signup-with-email]').click()
    cy.get('[data-cy=card]').matchImageSnapshot('signup-email-form-empty')

    cy.get('#name').type('Test User').should('have.value', 'Test User')
    cy.get('#email').type(userEmail).should('have.value', userEmail)
    cy.get('#password').type('P4ssw0rd!').should('have.value', 'P4ssw0rd!')
    cy.get('[data-cy=card]').matchImageSnapshot('signup-email-form-complete')
    cy.get('[data-cy=button-signup-form]').click()

    // Check that welcome email is received
    cy.task("gmail:check", {
      from: Cypress.config().contactEmail,
      to: userEmail,
      subject: Cypress.config().welcomeEmailSubject,
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
      from: Cypress.config().contactEmail,
      to: userEmail,
      subject: Cypress.config().verifyEmailSubject,
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


describe('Signup Form Tests', () => {
  beforeEach(() => {
    cy.setCookie("CookieConsent", "true")
  })

  it('Should have inactive signup button if password missing', () => {
    cy.visit('/signup')
    cy.get('[data-cy=button-signup-with-email]').click()
    cy.get('#name').type('Test User').should('have.value', 'Test User')
    cy.get('#email').type('test@gmail.com').should('have.value', 'test@gmail.com')
    cy.get('[data-cy=button-signup-form]').should('have.css', "pointer-events", "none")
  })

  after(() => {
    // Clean up new user that was created.
    cy.exec('python ' + Cypress.config().deleteUserScript + ' -e eweuser8+signup2@gmail.com')
  })

  it('Should have inactive signup button if email missing', () => {
    cy.visit('/signup')
    cy.get('[data-cy=button-signup-with-email]').click()
    cy.get('#name').type('Test User').should('have.value', 'Test User')
    cy.get('#password').type('P4ssw0rd!').should('have.value', 'P4ssw0rd!')
    cy.get('[data-cy=button-signup-form]').should('have.css', "pointer-events", "none")
  })

  it('Should have inactive signup button if name missing', () => {
    cy.visit('/signup')
    cy.get('[data-cy=button-signup-with-email]').click()
    cy.get('#email').type('test@gmail.com').should('have.value', 'test@gmail.com')
    cy.get('#password').type('P4ssw0rd!').should('have.value', 'P4ssw0rd!')
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

    cy.get('[data-cy=card]').matchImageSnapshot('signup-form-with-error')
  })

  it('Should have inactive confirmation form button until form complete', () => {
    const userEmail = "eweuser8+signup2@gmail.com"

    // Complete signup form for new user
    cy.visit('/signup')
    cy.contains('Sign Up')
    cy.get('[data-cy=button-signup-with-email]').click()

    cy.get('#name').type('Test User').should('have.value', 'Test User')
    cy.get('#email').type(userEmail).should('have.value', userEmail)
    cy.get('#password').type('P4ssw0rd!').should('have.value', 'P4ssw0rd!')
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
