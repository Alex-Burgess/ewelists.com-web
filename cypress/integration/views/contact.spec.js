import TestFilter from '../../support/TestFilter';

TestFilter(['smoke', 'regression'], () => {
  describe('Contact Page E2E Test', () => {
    let user = {}

    beforeEach(() => {
      cy.fixture('contact/contact.json').then(fixture => {
        user = fixture.user
      })
      cy.setCookie("CookieConsent", "true")
    })

    it('Should send email to contact address', () => {
      cy.visit('/contact')

      // Complete form and submit
      cy.get('#name').type(user.name)
      cy.get('#email').type(user.email)
      cy.get('#message').type('Dummy message')

      cy.get('[data-cy=contact]').click()

      // Confirm that confirmation is as expected
      cy.contains('Thank you for your message Cypress TestUser. We aim to respond to emails the same day.')
    })
  })
})


TestFilter(['regression'], () => {
  describe('Visual Snapshot Tests', () => {
    beforeEach(() => {
      cy.setCookie("CookieConsent", "true")
      cy.fixture('contact/response.json').as('response')
    })

    const page = 'contact';
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

    it('Should match previous screenshot of card after form submitted', function () {
      // Fakes the API request so that we don't need to update the DB.
      cy.server()
      cy.route('POST', '**/contact', 'fx:contact/response')

      cy.visit('/contact')

      cy.get('#name').type(this.response.name)
      cy.get('#email').type(this.response.email)
      cy.get('#message').type(this.response.message)

      cy.get('[data-cy=contact]').click()

      cy.contains('Thank you for your message Cypress TestUser. We aim to respond to emails the same day.')
      cy.get('header').invoke('css', 'position', 'relative');
      cy.get('[data-cy=contact-card]').matchImageSnapshot('confirmation-card');
    })
  })

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
  })
})
