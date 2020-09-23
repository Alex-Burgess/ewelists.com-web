import TestFilter from '../support/TestFilter';


TestFilter(['smoke', 'regression'], () => {
  describe('Contact Page E2E Test', () => {
    beforeEach(() => {
      cy.setCookie("CookieConsent", "true")
    })

    it('Should send email to contact address', () => {
      cy.visit('/contact')

      cy.get('[data-cy=contact]').matchImageSnapshot('submit-button-disabled');

      // Complete form and submit
      cy.get('#name').type('Dummy Name')
      cy.get('#email').type('dummy@gmail.com')
      cy.get('#message').type('Dummy message')

      cy.get('[data-cy=contact]').matchImageSnapshot('submit-button-enabled');
      cy.get('[data-cy=contact]').click()

      // Confirm that confirmation is as expected
      cy.contains('Thank you for your message Dummy Name. We aim to respond to emails the same day.')
      cy.get('header').invoke('css', 'position', 'relative');
      cy.get('[data-cy=card]').matchImageSnapshot('confirmation-view');
    })
  })
})


TestFilter(['regression'], () => {
  describe('Contact Page Form Tests', () => {
    beforeEach(() => {
      cy.setCookie("CookieConsent", "true")
    })

    it('Should have inactive button without message', () => {
      cy.visit('/contact')
      cy.get('#name').type('Dummy Name')
      cy.get('#email').type('dummy@gmail.com')
      cy.get('[data-cy=contact]').should('have.css', "pointer-events", "none")
    })

    it('Should have inactive button without name', () => {
      cy.visit('/contact')
      cy.get('#email').type('dummy@gmail.com')
      cy.get('#message').type('Dummy message')
      cy.get('[data-cy=contact]').should('have.css', "pointer-events", "none")
    })

    it('Should have inactive button without email', () => {
      cy.visit('/contact')
      cy.get('#name').type('Dummy Name')
      cy.get('#message').type('Dummy message')
      cy.get('[data-cy=contact]').should('have.css', "pointer-events", "none")
    })

    it('Should show confirmation page, but api request is stubbed', () => {
      // Fakes the API request to prevent emails being sent unnecessarily.
      cy.server()
      cy.route({
        method: 'POST',
        url: '/test/contact',
        response: {
            "name": "Dummy Name",
            "email": "dummy@gmail.com",
            "message": "A test message",
            "id": 493981
        }
      })

      cy.visit('/contact')

      cy.get('#name').type('Dummy Name')
      cy.get('#email').type('dummy@gmail.com')
      cy.get('#message').type('Dummy message')

      cy.get('[data-cy=contact]').click()

      cy.contains('Thank you for your message Dummy Name. We aim to respond to emails the same day.')
    })
  })
})
