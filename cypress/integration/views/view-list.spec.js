import TestFilter from '../../support/TestFilter';

// Smoke tests
TestFilter(['smoke', 'regression'], () => {
  // Main Test scenarios which are covered by smoke tests are:
  // Authed vs not authed
  // Products table vs notfound table
  // Quanity of 1, or more

  describe('View List - Reserve Gift When Authed E2E Test', () => {
    const sizes = Cypress.env("snapshotSizes");
    const userEmail = "eweuser8+viewlist@gmail.com"
    const userName = 'Test View-List-Page'
    let userId = ""
    let listId = ""
    let notfoundId = ""

    before(() => {
      cy.exec(Cypress.env('createUserScript') + ' -e ' + userEmail + ' -n "' + userName + '" -U ' + Cypress.env("userPoolId")).then((result) => {
        userId = result.stdout

        cy.exec(Cypress.env('createListScript') + ' -u ' + userId + ' -t ' + Cypress.env("listsTable")).then((result) => {
          listId = result.stdout

          cy.exec(Cypress.env('addGiftScript')
            + ' -L ' + Cypress.env("listsTable")
            + ' -G ' + Cypress.env("notfoundTable")
            + ' -u ' + userId
            + ' -l ' + listId
            + ' -f ' + 'cypress/fixtures/notfound.json'
          ).then((result) => {
            notfoundId = result.stdout
            cy.log("Created notfound gift: " + notfoundId)
          })
        })
      })
    })

    after(() => {
      cy.exec(Cypress.env('deleteUserScript') + ' -e ' + userEmail + ' -U ' + Cypress.env("userPoolId") + ' -t ' + Cypress.env("listsTable"))
      cy.exec(Cypress.env('deleteListScript') + ' -l ' + listId + ' -u ' + userId + ' -t ' + Cypress.env("listsTable"))
      cy.exec(Cypress.env('deleteProductScript') + ' -p ' + notfoundId + ' -t ' + Cypress.env("notfoundTable"))
    })

    beforeEach(() => {
      cy.login(userEmail, Cypress.env('testUserPassword'))
      cy.visit('/lists/' + listId)
    })

    it('should reserve gift when user authed', () => {
      // Ensure page has loaded and contains products
      cy.contains("Cypress Test Gift List")
      cy.get('[data-cy=product-card]').should('have.length', 1)

      // Open Reserve popout
      cy.get('[data-cy=product-card]').eq(0).find('[data-cy=button-reserve]').click()
      cy.get('#name').should('have.value', userName).should('have.attr', "disabled")
      cy.get('#email').should('have.value', userEmail).should('have.attr', "disabled")
      cy.get('[data-cy=popout-button-reserve]').eq(0).click()

      // Should be redirect to reservation page
      cy.url().should('include', '/reserve/')
    })
  })

  describe('View List - Reserve Gift When Not Authed E2E Test', () => {
    const sizes = Cypress.env("snapshotSizes");
    const userEmail = "eweuser8+viewlist@gmail.com"
    const userName = 'Test View-List-Page'
    let userId = ""
    let listId = ""
    let productsId = ""

    before(() => {
      cy.exec(Cypress.env('createUserScript') + ' -e ' + userEmail + ' -n "' + userName + '" -U ' + Cypress.env("userPoolId")).then((result) => {
        userId = result.stdout

        cy.exec(Cypress.env('createListScript') + ' -u ' + userId + ' -t ' + Cypress.env("listsTable")).then((result) => {
          listId = result.stdout

          cy.exec(Cypress.env('addGiftScript')
            + ' -L ' + Cypress.env("listsTable")
            + ' -G ' + Cypress.env("productsTable")
            + ' -u ' + userId
            + ' -l ' + listId
            + ' -q ' + 2
            + ' -f ' + 'cypress/fixtures/product.json'
          ).then((result) => {
            productsId = result.stdout
            cy.log("Created products gift: " + productsId)
          })
        })
      })
    })

    after(() => {
      cy.exec(Cypress.env('deleteUserScript') + ' -e ' + userEmail + ' -U ' + Cypress.env("userPoolId") + ' -t ' + Cypress.env("listsTable"))
      cy.exec(Cypress.env('deleteListScript') + ' -l ' + listId + ' -u ' + userId + ' -t ' + Cypress.env("listsTable"))
      cy.exec(Cypress.env('deleteProductScript') + ' -p ' + productsId + ' -t ' + Cypress.env("productsTable"))
    })

    beforeEach(() => {
      cy.setCookie("CookieConsent", "true")
      cy.visit('/lists/' + listId)
    })

    it('should reserve gift when user authed', () => {
      // Ensure page has loaded and contains products
      cy.contains("Cypress Test Gift List")
      cy.get('[data-cy=product-card]').should('have.length', 1)

      // Open Reserve popout
      cy.get('[data-cy=product-card]').eq(0).find('[data-cy=button-reserve]').click()

      cy.get('#name').type('Cypress ReserveUser1').should('have.value', "Cypress ReserveUser1")
      cy.get('#email').type('eweuser8+reserveuser1@gmail.com').should('have.value', "eweuser8+reserveuser1@gmail.com")
      cy.get('[data-cy=popout-button-quantity-increase]').eq(0).click()
      cy.get('[data-cy=popout-button-reserve]').eq(0).click()

      // Should be redirect to reservation page
      cy.url().should('include', '/reserve/')
    })
  })
})

TestFilter(['regression'], () => {
  describe('Visual Snapshot Tests', () => {
    const sizes = Cypress.env("snapshotSizes");

    beforeEach(() => {
      cy.server()
      cy.fixture('view-list-response').then((viewResponse) => {
        cy.route({
          method: 'GET',
          url: '/' + Cypress.env('environment') + '/lists/12345678-test-list-0001-abcdefghijkl/shared',
          response: viewResponse
        })
      })

      cy.fixture('view-list-product-response-1').then((productResponse) => {
        cy.route({
          method: 'GET',
          url: '/' + Cypress.env('environment') + '/products/12345678-prod-t001-1234-abcdefghijkl',
          response: productResponse
        })
      })

      cy.fixture('view-list-product-response-2').then((productResponse) => {
        cy.route({
          method: 'GET',
          url: '/' + Cypress.env('environment') + '/products/12345678-prod-t034-1234-abcdefghijkl',
          response: productResponse
        })
      })

      cy.setCookie("CookieConsent", "true")
      cy.visit('/lists/12345678-test-list-0001-abcdefghijkl')
    })

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
        cy.get('[data-cy=product-card]').eq(0).find('[data-cy=button-reserve]').click()
        cy.get('[data-cy=popout-reserve]').eq(0).matchImageSnapshot(`Reserve-popout-${size}`)
      })
    })
  })
})

TestFilter(['regression'], () => {
  describe('Reserve popout form validation', () => {
    beforeEach(() => {
      cy.server()
      cy.fixture('view-list-response').then((viewResponse) => {
        cy.route({
          method: 'GET',
          url: '/' + Cypress.env('environment') + '/lists/12345678-test-list-0001-abcdefghijkl/shared',
          response: viewResponse
        })
      })

      cy.fixture('view-list-product-response-1').then((productResponse) => {
        cy.route({
          method: 'GET',
          url: '/' + Cypress.env('environment') + '/products/12345678-prod-t001-1234-abcdefghijkl',
          response: productResponse
        })
      })

      cy.fixture('view-list-product-response-2').then((productResponse) => {
        cy.route({
          method: 'GET',
          url: '/' + Cypress.env('environment') + '/products/12345678-prod-t034-1234-abcdefghijkl',
          response: productResponse
        })
      })

      cy.setCookie("CookieConsent", "true")
      cy.visit('/lists/12345678-test-list-0001-abcdefghijkl')
    })

    it(`should have inactive button, if name or email not supplied`, () => {
      // Open popout
      cy.get('[data-cy=product-card]').eq(0).find('[data-cy=button-reserve]').click()

      // Should be inactive to start with
      cy.get('[data-cy=popout-button-reserve]').eq(0).should('have.css', "pointer-events", "none")

      // Should be active after entering both fields
      cy.get('#name').type('Cypress ReserveUser1')
      cy.get('#email').type('eweuser8+reserveuser1@gmail.com')
      cy.get('[data-cy=popout-button-reserve]').eq(0).should('have.css', "pointer-events", "auto")

      // Clear name
      cy.get('#name').clear()
      cy.get('[data-cy=popout-button-reserve]').eq(0).should('have.css', "pointer-events", "none")

      // Clear name
      cy.get('#name').type('Cypress ReserveUser1')
      cy.get('#email').clear()
      cy.get('[data-cy=popout-button-reserve]').eq(0).should('have.css', "pointer-events", "none")
    })

    it.only(`should have inactive button, immediately after form submission`, () => {
      // Open popout
      cy.get('[data-cy=product-card]').eq(0).find('[data-cy=button-reserve]').click()

      // Should be active after entering both fields
      cy.get('#name').type('Cypress ReserveUser1')
      cy.get('#email').type('eweuser8+reserveuser1@gmail.com')
      cy.get('[data-cy=popout-button-reserve]').eq(0).should('have.css', "pointer-events", "auto")

      // Click reserve button and check then disabled
      cy.get('[data-cy=popout-button-reserve]').eq(0).click()
      cy.get('[data-cy=popout-button-reserve]').eq(0).should('have.css', "pointer-events", "none")
    })
  })
})
