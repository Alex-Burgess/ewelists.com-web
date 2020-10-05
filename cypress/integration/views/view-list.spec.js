import TestFilter from '../../support/TestFilter';

// Smoke tests
TestFilter(['smoke', 'regression'], () => {
  // Main Test scenarios which are covered by smoke tests are:
  // Authed vs not authed
  // Products table vs notfound table
  // Quanity of 1, or more

  describe('View List - Reserve Gift When Authed E2E Test', () => {
    let seedResponse = {}
    let user = {}

    before(() => {
      cy.fixture('view-list/seed-e2e.json').then(fixture => {
        user = fixture.user
        cy.log("User email: " + user.email)
      })

      cy.exec(Cypress.env('seedDB') + ' -f cypress/fixtures/view-list/seed-e2e.json').then((result) => {
        seedResponse = JSON.parse(result.stdout)
        cy.log("User ID: " + seedResponse.user_id)
        cy.log("List ID: " + seedResponse.list_id)
        cy.log("Products IDs: " + seedResponse.product_ids)
      })
    })

    after(() => {
      seedResponse['user_email'] = user.email
      cy.exec(Cypress.env('cleanDB') + ' -d \'' + JSON.stringify(seedResponse) + '\'').then((result) => {
        cy.log("Delete response: " + result.stdout)
      })
    })

    beforeEach(() => {
      cy.login(user.email, user.password)
      cy.visit('/lists/' + seedResponse.list_id)
    })

    it('should reserve gift when user authed', () => {
      // Ensure page has loaded and contains products
      cy.contains("Cypress Test Wish List")
      cy.get('[data-cy=product-card-' + seedResponse['product_ids'][0] + ']').find('[data-cy=button-reserve]').click()

      cy.get('[data-cy=popout-reserve-' + seedResponse['product_ids'][0] + ']').within(($product) => {
        cy.get('#name-' + seedResponse['product_ids'][0]).should('have.value', user.name).should('have.attr', "disabled")
        cy.get('#email-' + seedResponse['product_ids'][0]).should('have.value', user.email).should('have.attr', "disabled")
        cy.get('[data-cy=popout-button-reserve]').click()
      })

      // Should be redirect to reservation page
      cy.url().should('include', '/reserve/')
    })
  })

  describe('View List - Reserve Gift When Not Authed E2E Test', () => {
    let seedResponse = {}
    let user = {}

    before(() => {
      cy.fixture('view-list/seed-e2e.json').then(fixture => {
        user = fixture.user
        cy.log("User email: " + user.email)
      })

      cy.exec(Cypress.env('seedDB') + ' -f cypress/fixtures/view-list/seed-e2e.json').then((result) => {
        seedResponse = JSON.parse(result.stdout)
        cy.log("User ID: " + seedResponse.user_id)
        cy.log("List ID: " + seedResponse.list_id)
        cy.log("Products IDs: " + seedResponse.product_ids)
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
      cy.visit('/lists/' + seedResponse.list_id)
    })

    it('should reserve gift when user authed', () => {
      // Ensure page has loaded and contains products
      cy.contains("Cypress Test Wish List")

      // Open Reserve popout
      cy.get('[data-cy=product-card-' + seedResponse['product_ids'][0] + ']').find('[data-cy=button-reserve]').click()

      cy.get('[data-cy=popout-reserve-' + seedResponse['product_ids'][0] + ']').within(($product) => {
        cy.get('#name-' + seedResponse['product_ids'][0]).type('Cypress ReserveUser1').should('have.value', "Cypress ReserveUser1")
        cy.get('#email-' + seedResponse['product_ids'][0]).type('eweuser8+reserveuser1@gmail.com').should('have.value', "eweuser8+reserveuser1@gmail.com")
        cy.get('[data-cy=popout-button-quantity-increase]').click()
        cy.get('[data-cy=popout-button-reserve]').click()
      })

      // Should be redirect to reservation page
      cy.url().should('include', '/reserve/')
    })
  })
})

TestFilter(['regression'], () => {
  describe('Visual Snapshot Tests', () => {
    beforeEach(() => {
      // Stub API responses
      cy.server()
      cy.route('GET', '**/lists/12345678-test-list-0001-abcdefghijkl/shared', 'fx:view-list/get-list-response')
      cy.route('GET', '**/products/12345678-prod-t001-1234-abcdefghijkl', 'fx:view-list/get-product-response-1')
      cy.route('GET', '**/products/12345678-prod-t034-1234-abcdefghijkl', 'fx:view-list/get-product-response-2')

      cy.setCookie("CookieConsent", "true")
      cy.visit('/lists/12345678-test-list-0001-abcdefghijkl')
    })

    const sizes = Cypress.env("snapshotSizes");
    sizes.forEach((size) => {
      it(`Should match previous screenshot of when ${size} resolution`, () => {
        if (Cypress._.isArray(size)) {
          cy.viewport(size[0], size[1])
        } else {
          cy.viewport(size)
        }
        cy.contains("Baby Shower Wish List")

        cy.get('header').invoke('css', 'position', 'relative');
        Cypress.config('defaultCommandTimeout', 50000)
        cy.matchImageSnapshot(`View-List-Page-${size}`)

        // Snapshot reserve popout
        cy.get('[data-cy=product-card-12345678-prod-t001-1234-abcdefghijkl]').find('[data-cy=button-reserve]').click()
        cy.get('[data-cy=popout-reserve-12345678-prod-t001-1234-abcdefghijkl]').matchImageSnapshot(`Reserve-popout-${size}`)
      })
    })
  })
})

TestFilter(['regression'], () => {
  describe('Reserve popout form validation', () => {
    beforeEach(() => {
      // Stub API responses
      cy.server()
      cy.route('GET', '**/lists/12345678-test-list-0001-abcdefghijkl/shared', 'fx:view-list/get-list-response')
      cy.route('GET', '**/products/12345678-prod-t001-1234-abcdefghijkl', 'fx:view-list/get-product-response-1')
      cy.route('GET', '**/products/12345678-prod-t034-1234-abcdefghijkl', 'fx:view-list/get-product-response-2')

      cy.setCookie("CookieConsent", "true")
      cy.visit('/lists/12345678-test-list-0001-abcdefghijkl')
    })

    it(`should have inactive button, if name or email not supplied`, () => {
      // Open popout
      cy.get('[data-cy=product-card-12345678-prod-t001-1234-abcdefghijkl]').find('[data-cy=button-reserve]').click()

      cy.get('[data-cy=popout-reserve-12345678-prod-t001-1234-abcdefghijkl]').within(($product) => {
        // Should be inactive to start with
        cy.get('[data-cy=popout-button-reserve]').should('have.css', "pointer-events", "none")

        // Should be active after entering both fields
        cy.get('#name-12345678-prod-t001-1234-abcdefghijkl').type('Cypress ReserveUser1')
        cy.get('#email-12345678-prod-t001-1234-abcdefghijkl').type('eweuser8+reserveuser1@gmail.com')
        cy.get('[data-cy=popout-button-reserve]').should('have.css', "pointer-events", "auto")

        // Clear name
        cy.get('#name-12345678-prod-t001-1234-abcdefghijkl').clear()
        cy.get('[data-cy=popout-button-reserve]').should('have.css', "pointer-events", "none")

        // Clear name
        cy.get('#name-12345678-prod-t001-1234-abcdefghijkl').type('Cypress ReserveUser1')
        cy.get('#email-12345678-prod-t001-1234-abcdefghijkl').clear()
        cy.get('[data-cy=popout-button-reserve]').should('have.css', "pointer-events", "none")
      })
    })

    it(`should have inactive button, immediately after form submission`, () => {
      // Open popout
      cy.get('[data-cy=product-card-12345678-prod-t001-1234-abcdefghijkl]').find('[data-cy=button-reserve]').click()

      cy.get('[data-cy=popout-reserve-12345678-prod-t001-1234-abcdefghijkl]').within(($product) => {
        // Should be active after entering both fields
        cy.get('#name-12345678-prod-t001-1234-abcdefghijkl').type('Cypress ReserveUser1')
        cy.get('#email-12345678-prod-t001-1234-abcdefghijkl').type('eweuser8+reserveuser1@gmail.com')
        cy.get('[data-cy=popout-button-reserve]').should('have.css', "pointer-events", "auto")

        // Click reserve button and check then disabled
        cy.get('[data-cy=popout-button-reserve]').click()
        cy.get('[data-cy=popout-button-reserve]').should('have.css', "pointer-events", "none")
      })
    })
  })
})
