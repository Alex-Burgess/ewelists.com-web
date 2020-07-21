describe('Reset password E2E Test', () => {
  beforeEach(() => {
    cy.setCookie("CookieConsent", "true")
    cy.exec('python ' + Cypress.config().createUserScript + ' -e eweuser8+reset@gmail.com -n "Cypress TestReset"')
  })

  after(() => {
    cy.exec('python ' + Cypress.config().deleteUserScript + ' -e eweuser8+reset@gmail.com')
  })

  it('resets password for test user', () => {
    cy.visit('/reset')
    cy.contains('Reset')
    cy.get('[data-cy=card]').matchImageSnapshot('empty-reset-form');

    const date = new Date();

    cy.get('#email').type('eweuser8+reset@gmail.com').should('have.value', 'eweuser8+reset@gmail.com')
    cy.get('[data-cy=card]').matchImageSnapshot('complete-reset-form');
    cy.get('[data-cy=submit-reset]').click()

    cy.contains('Confirmation Code')
    cy.get('[data-cy=card]').matchImageSnapshot('empty-confirmation-form');

    cy.task("gmail:check", {
      from: "contact@ewelists.com",
      to: "eweuser8+reset@gmail.com",
      subject: "Verify your Ewelists account (test)",
      after: date,
    })
    .then(email => {
      const body = email.body.html

      assert.isTrue(body.indexOf("Your One Time Password (OTP) is below") >= 0, "Found reset link");

      const code = body.match(/ [0-9]{6} /)[0].trim()

      cy.get('#code').type(code)
      cy.get('#password').type('P4ssw0rd!').should('have.value', 'P4ssw0rd!')
      cy.get('#confirmPassword').type('P4ssw0rd!').should('have.value', 'P4ssw0rd!')
      cy.get('[data-cy=card]').matchImageSnapshot('complete-confirmation-form', { blackout: ['#code']});

      cy.get('[data-cy=submit-verify]').click()
      cy.contains('Password Reset Complete')
      cy.get('[data-cy=card]').matchImageSnapshot('reset-complete-form');

      cy.contains("Login with your new credentials").click()
      cy.url().should('include', '/login')
    });
  })
})


describe('Reset Form Tests', () => {
  var val = Math.floor(Math.random() * 1000);
  const email = "eweuser8+reset" + val + "@gmail.com"

  before(() => {
    cy.exec('python ' + Cypress.config().createUserScript + ' -e ' + email + ' -n "Cypress Test Reset2"')
  })

  after(() => {
    cy.exec('python ' + Cypress.config().deleteUserScript + ' -e ' + email)
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

    cy.get('#email').type(email)
    cy.get('[data-cy=submit-reset]').click()
    cy.contains('Confirmation Code')

    cy.get('#code').type('123456')
    cy.get('[data-cy=submit-verify]').should('have.css', "pointer-events", "none")

    cy.get('#password').type('P4ssw0rd!')
    cy.get('[data-cy=submit-verify]').should('have.css', "pointer-events", "none")

    cy.get('#confirmPassword').type('P4ssw0rd!')
    cy.get('[data-cy=submit-verify]').should('have.css', "pointer-events", "auto")

    cy.get('[data-cy=submit-verify]').click()
    cy.contains('Invalid verification code provided, please try again.')
    cy.get('[data-cy=card]').matchImageSnapshot('confirmation-error');
  })

  it('Should error if password rules not matched', () => {
    const date = new Date();

    cy.visit('/reset')
    cy.get('#email').type(email)
    cy.get('[data-cy=submit-reset]').click()
    cy.contains('Confirmation Code')

    cy.task("gmail:check", {
      from: "contact@ewelists.com",
      to: email,
      subject: "Verify your Ewelists account (test)",
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
      cy.get('#password').type('P4ssw0rd!').should('have.value', 'P4ssw0rd!')
      cy.get('#confirmPassword').type('P4ssw0rd-').should('have.value', 'P4ssw0rd-')
      cy.get('[data-cy=submit-verify]').click()
      cy.contains("Your confirmed password does not match the new password.")
    });
  })
})
