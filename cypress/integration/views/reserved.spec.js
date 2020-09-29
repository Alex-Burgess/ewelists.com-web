import TestFilter from '../../support/TestFilter';

// Smoke tests
// TODO - E2E
// TestFilter(['smoke', 'regression'], () => {
//   describe('Reserved Page - Purchased E2E Test - Not Authed', () => {
//     const sizes = Cypress.env("snapshotSizes");
//     let listId = ""
//     let productsId = ""
//     let resvId = ""
//
//     // To setup test need to do the following:
//     // Create a list
//     // Add a product
//     // Create a reservation
//     before(() => {
//       cy.fixture('create-list-post-body.json')
//         .then(data => cy.request('https://4sdcvv0n2e.execute-api.eu-west-1.amazonaws.com/test/lists', data))
//       // https://{{lists_url_id}}.execute-api.eu-west-1.amazonaws.com/{{env}}/lists
//
//     })
//
//     after(() => {
//       cy.fixture('reserved-e2e-data').then((data) => {
//         cy.exec(Cypress.env('deleteListScript') + ' -l ' + listId + ' -u ' + data['list'].listOwner + ' -t ' + Cypress.env("listsTable"))
//         // cy.exec(Cypress.env('deleteProductScript') + ' -p ' + productsId + ' -t ' + Cypress.env("productsTable"))
//       })
//     })
//
//     beforeEach(() => {
//       cy.setCookie("CookieConsent", "true")
//       cy.visit('/reserve/' + resvId)
//     })
//
//     it.only('should reserve gift when user authed', () => {
//       // Ensure page has loaded and contains products
//       cy.contains("Reservation")
//     })
//   })
// })

TestFilter(['regression'], () => {
  describe('Visual Snapshot Tests', () => {
    const sizes = Cypress.env("snapshotSizes");

    beforeEach(() => {
      cy.server()
      cy.fixture('reserved-snapshot-data').then((data) => {
        cy.route({
          method: 'GET',
          url: '/' + Cypress.env('environment') + '/lists/reservation/12345678-test-resv-0001-abcdefghijkl',
          response: data['getReservation']
        })

        cy.route({
          method: 'GET',
          url: '/' + Cypress.env('environment') + '/lists/12345678-test-list-0001-abcdefghijkl/shared',
          response: data['getList']
        })

        cy.route({
          method: 'GET',
          url: '/' + Cypress.env('environment') + '/products/12345678-test-prod-0001-abcdefghijkl',
          response: data['getProduct']
        })
      })

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
