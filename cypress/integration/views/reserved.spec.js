import TestFilter from '../../support/TestFilter';

// Smoke tests
// TODO - E2E
TestFilter(['smoke', 'regression'], () => {
  describe('Reserved Page - Purchased E2E Test - Not Authed', () => {
    let seedResponse = {}
    let user = {}

    before(() => {
      cy.fixture('reserved/seed-e2e.json').then(fixture => {
        user = fixture.user
        cy.log("User email: " + user.email)
      })

      cy.exec(Cypress.env('seedDB') + ' -f cypress/fixtures/reserved/seed-e2e.json').then((result) => {
        seedResponse = JSON.parse(result.stdout)
        cy.log("User ID: " + seedResponse.user_id)
        cy.log("List ID: " + seedResponse.list_id)
        cy.log("Products IDs: " + seedResponse.product_ids)
        cy.log("Reservation IDs: " + seedResponse.reservation_ids)
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
      cy.visit('/reserve/' + seedResponse.reservation_ids[0])
    })

    it.only('should reserve gift when user authed', () => {
      // Ensure page has loaded and contains products
      cy.contains("Reservation")
    })
  })
})

TestFilter(['regression'], () => {
  describe('Visual Snapshot Tests', () => {
    const sizes = Cypress.env("snapshotSizes");

    beforeEach(() => {
      cy.server()
      cy.route('GET', '**/lists/reservation/12345678-test-resv-0001-abcdefghijkl', 'fx:reserved/snapshot-get-reservation')
      cy.route('GET', '**/lists/12345678-test-list-0001-abcdefghijkl/shared', 'fx:reserved/snapshot-get-list')
      cy.route('GET', '**/products/12345678-test-prod-0001-abcdefghijkl', 'fx:reserved/snapshot-get-product')

      cy.setCookie("CookieConsent", "true")
    })

    sizes.forEach((size) => {
      it(`Should match previous screenshot of when ${size} resolution`, () => {
        if (Cypress._.isArray(size)) {
          cy.viewport(size[0], size[1])
        } else {
          cy.viewport(size)
        }
        cy.visit('/reserve/12345678-test-resv-0001-abcdefghijkl')
        cy.contains("Mamas & Papas")

        cy.get('header').invoke('css', 'position', 'relative');
        Cypress.config('defaultCommandTimeout', 50000)
        cy.matchImageSnapshot(`Reserved-Page-${size}`)
      })
    })
  })
})
