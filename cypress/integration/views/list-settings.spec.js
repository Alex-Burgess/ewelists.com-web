import TestFilter from '../../support/TestFilter';

// Smoke tests
TestFilter(['smoke', 'regression'], () => {
  describe('Edit E2E Test', () => {
    const sizes = Cypress.env("snapshotSizes");
    const userEmail = "eweuser8+listsettings@gmail.com"
    const userName = 'Test List-Settings-Page'
    let userId = ""
    let listId = ""

    before(() => {
      cy.exec(Cypress.env('createUserScript') + ' -e ' + userEmail + ' -n "' + userName + '" -U ' + Cypress.env("userPoolId")).then((result) => {
        userId = result.stdout

        cy.exec(Cypress.env('createListScript') + ' -u ' + userId + ' -t ' + Cypress.env("listsTable")).then((result) => {
          listId = result.stdout
        })
      })
    })

    after(() => {
      cy.exec(Cypress.env('deleteUserScript') + ' -e ' + userEmail + ' -U ' + Cypress.env("userPoolId") + ' -t ' + Cypress.env("listsTable"))
      cy.exec(Cypress.env('deleteListScript') + ' -l ' + listId + ' -u ' + userId + ' -t ' + Cypress.env("listsTable"))
    })

    beforeEach(() => {
      cy.login(userEmail, Cypress.env('testUserPassword'))
      cy.visit('/settings/' + listId)
    })

    it('should edit details of the list', () => {
      // Ensure page has loaded
      cy.contains("Settings")
      cy.contains("A test list")

      cy.get('[data-cy=button-edit]').click()

      cy.get('#title').clear().type("Birthday Gift List").should('have.value', "Birthday Gift List")
      cy.get('.datepicker').click();
      cy.contains('24').click();
      cy.get('#mui-component-select-occasion').click()
      cy.contains('Birthday').click();
      cy.get('#description').type(" for my birthday").should('have.value', "A test list for my birthday")

      cy.get('[data-cy=button-save]').click()

      cy.contains("A test list for my birthday")
    })

    it('should delete the list', () => {
      // Ensure page has loaded
      cy.contains("Settings")
      cy.contains("A test list")

      // Open delete popout
      cy.get('[data-cy=button-delete]').click()

      // Confirm delete list
      cy.get('[data-cy=popout-delete]').find('[data-cy=button-confirm]').click()

      // Redirected to dashboard
      cy.url().should('eq', Cypress.config().baseUrl + '/')
    })
  })
})



TestFilter(['regression'], () => {
  describe('Visual Snapshot Tests', () => {
    const userEmail = "eweuser8+listsettings@gmail.com"
    const userName = '"Test List-Settings-Page"'

    const sizes = Cypress.env("snapshotSizes");

    before(() => {
      cy.exec(Cypress.env('createUserScript') + ' -e ' + userEmail + ' -n ' + userName + ' -U ' + Cypress.env("userPoolId"))
    })

    after(() => {
      cy.exec(Cypress.env('deleteUserScript') + ' -e ' + userEmail + ' -U ' + Cypress.env("userPoolId") + ' -t ' + Cypress.env("listsTable"))
    })

    beforeEach(() => {
      cy.login(userEmail, Cypress.env('testUserPassword'))

      cy.server()
      cy.route({
        method: 'GET',
        url: '/' + Cypress.env('environment') + '/lists/12345678-test-list-0001-abcdefghijkl',
        response: {
          "list":{
            "listId":"12345678-test-list-0001-abcdefghijkl",
            "title":"Baby Shower Wish List",
            "description":"Gift ideas for my baby shower",
            "occasion":"Baby Shower",
            "imageUrl":"https://test.ewelists.com/images/babyshower-default.jpg",
            "listOwner":"7b58df8d-bccd-42e2-ab0f-1a8c62d0af9f",
            "state":"open",
            "eventDate":"31 October 2020"
          },
          "products":{},
          "reserved":[]
        }
      })


      cy.visit('/settings/12345678-test-list-0001-abcdefghijkl')
    })

    sizes.forEach((size) => {
      it(`Should match previous screenshot when ${size} resolution`, () => {
        cy.setCookie("CookieConsent", "true")

        if (Cypress._.isArray(size)) {
          cy.viewport(size[0], size[1])
        } else {
          cy.viewport(size)
        }
        cy.contains("Gift ideas for my baby shower")

        cy.get('header').invoke('css', 'position', 'relative');
        Cypress.config('defaultCommandTimeout', 50000)
        cy.matchImageSnapshot(`List-Settings-${size}`)
      })
    })
  })
})
