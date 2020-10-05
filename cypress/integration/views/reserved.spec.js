import TestFilter from '../../support/TestFilter';

// Smoke tests
TestFilter(['smoke', 'regression'], () => {
  describe('Reserved Page - E2E Tests - Not Authed', () => {
    let seedResponse = {}
    let user = {}

    beforeEach(() => {
      cy.setCookie("CookieConsent", "true")

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

        cy.visit('/reserve/' + seedResponse.reservation_ids[0])
      })

    })

    afterEach(() => {
      seedResponse['user_email'] = user.email
      cy.exec(Cypress.env('cleanDB') + ' -d \'' + JSON.stringify(seedResponse) + '\'').then((result) => {
        cy.log("Delete response: " + result.stdout)
      })
    })

    it('should confirm gift as purchased', () => {
      // Ensure page has loaded and contains products
      cy.contains("Reservation")
      cy.get('[data-cy=button-purchased]').click()
      cy.contains("Thank you for confirming you purchased this gift.")
    })

    it('should unreserve gift', () => {
      // Ensure page has loaded and contains products
      cy.contains("Reservation")
      cy.get('[data-cy=button-unreserve]').click()
      cy.contains("This gift was unreserved.")
    })

    it('should update quantites', () => {
      // Ensure page has loaded and contains products
      cy.contains("Reservation")

      // Increase quanity
      cy.get('[data-cy=button-increase-quantity]').click()
      cy.get('[data-cy=button-update-product]').click()
      cy.get('[data-cy=button-update-product]').contains('Updated!')

      // button state should return to normal
      cy.get('[data-cy=button-update-product]').contains('Update')

      // Decrease quanity
      cy.get('[data-cy=button-decrease-quantity]').click()
      cy.get('[data-cy=button-update-product]').click()
      cy.get('[data-cy=button-update-product]').contains('Updated!')
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

TestFilter(['regression'], () => {
  describe('Reservation Page Regression Tests', () => {
    beforeEach(() => {
      cy.server()
      cy.route('GET', '**/lists/reservation/12345678-test-resv-0001-abcdefghijkl', 'fx:reserved/snapshot-get-reservation')
      cy.route('GET', '**/lists/12345678-test-list-0001-abcdefghijkl/shared', 'fx:reserved/snapshot-get-list')
      cy.route('GET', '**/products/12345678-test-prod-0001-abcdefghijkl', 'fx:reserved/snapshot-get-product')

      cy.setCookie("CookieConsent", "true")
      cy.visit('/reserve/12345678-test-resv-0001-abcdefghijkl')
    })

    it('should have link to buy product', () => {
      cy.get('[data-cy=link-buy-gift]').should('have.attr', 'href', 'https://www.mamasandpapas.com/en-gb/acro-lightweight-buggy-black/p/657225301')
    })

    it('should have link to back to list', () => {
      cy.get('[data-cy=link-back-to-list]').should('have.attr', 'href', '/lists/12345678-test-list-0001-abcdefghijkl')
    })

    it('should show message to user if problem confirming product as purchased', () => {
      cy.get('[data-cy=button-purchased]').click()
      cy.contains("Oops! There was an issue confirming the purchase of this gift, please contact us.")
    })

    it('should show message to user if problem unreserving gift', () => {
      cy.get('[data-cy=button-unreserve]').click()
      cy.contains("Oops! There was an issue unreserving this gift, please contact us.")
    })

    it('should show message to user if problem updating quantity', () => {
      cy.get('[data-cy=button-increase-quantity]').click()
      cy.get('[data-cy=button-update-product]').click()
      cy.contains("Oops! There was an issue updating the quantity of this gift, please contact us.")
    })
  })

  describe('Additional Scenario Regression Tests', () => {
    it('should show purchased confirmed message to user on page load', () => {
      cy.server()
      cy.route('GET', '**/lists/reservation/12345678-test-resv-0001-abcdefghijkl', 'fx:reserved/purchased-get-reservation')
      cy.route('GET', '**/lists/12345678-test-list-0001-abcdefghijkl/shared', 'fx:reserved/purchased-get-list')
      cy.route('GET', '**/products/12345678-test-prod-0001-abcdefghijkl', 'fx:reserved/snapshot-get-product')

      cy.setCookie("CookieConsent", "true")
      cy.visit('/reserve/12345678-test-resv-0001-abcdefghijkl')

      cy.contains("Looks like you confirmed your purchase of this gift already.")
    })

    it('should show product unreserved message to user on page load', () => {
      cy.server()
      cy.route('GET', '**/lists/reservation/12345678-test-resv-0001-abcdefghijkl', 'fx:reserved/unreserved-get-reservation')
      cy.route('GET', '**/lists/12345678-test-list-0001-abcdefghijkl/shared', 'fx:reserved/unreserved-get-list')
      cy.route('GET', '**/products/12345678-test-prod-0001-abcdefghijkl', 'fx:reserved/snapshot-get-product')

      cy.setCookie("CookieConsent", "true")
      cy.visit('/reserve/12345678-test-resv-0001-abcdefghijkl')

      cy.contains("Looks like you unreserved this gift already.")
    })

    it.skip('should show closed list message to user on page load', () => {
      cy.server()
      cy.route('GET', '**/lists/reservation/12345678-test-resv-0001-abcdefghijkl', 'fx:reserved/closed-get-reservation')
      cy.route('GET', '**/lists/12345678-test-list-0001-abcdefghijkl/shared', 'fx:reserved/closed-get-list')
      cy.route('GET', '**/products/12345678-test-prod-0001-abcdefghijkl', 'fx:reserved/snapshot-get-product')

      cy.setCookie("CookieConsent", "true")
      cy.visit('/reserve/12345678-test-resv-0001-abcdefghijkl')

      cy.contains("list closed.")
    })
  })
})
