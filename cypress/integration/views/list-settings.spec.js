import TestFilter from '../../support/TestFilter';

// Smoke tests
TestFilter(['smoke', 'regression'], () => {
  describe('List Settings E2E Test', () => {
    const userEmail = "eweuser8+listsettings@gmail.com"
    const userName = 'Test List-Settings-Page'

    let seedResponse = {}
    let user = {}

    before(() => {
      cy.fixture('list-settings/list-settings-e2e.json').then(fixture => {
        user = fixture.user
        cy.log("User email: " + user.email)
      })

      cy.exec(Cypress.env('seedDB') + ' -f cypress/fixtures/list-settings/list-settings-e2e.json').then((result) => {
        seedResponse = JSON.parse(result.stdout)
        cy.log("User ID: " + seedResponse.user_id)
        cy.log("List ID: " + seedResponse.list_id)
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
      cy.visit('/settings/' + seedResponse.list_id)
    })

    it('should edit details of the list', () => {
      // Ensure page has loaded
      cy.contains("Settings")
      cy.contains("A test list")

      cy.get('[data-cy=button-edit]').click()
      cy.get('#title').should('have.value', "Cypress Test Wish List")

      cy.get('#title').clear().type("Birthday Gift List").should('have.value', "Birthday Gift List")
      cy.get('.datepicker').click();
      cy.contains('24').click();
      cy.get('#mui-component-select-occasion').click()
      cy.contains('Baby Shower').click();
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
    let user = {}

    before(() => {
      cy.fixture('list-settings/snapshot-seed.json').then(fixture => {
        user = fixture.user
        cy.log("User email: " + user.email)
      })

      cy.exec(Cypress.env('seedDB') + ' -f cypress/fixtures/list-settings/snapshot-seed.json').then((result) => {
        const response = JSON.parse(result.stdout)
        cy.log("User ID: " + response.user_id)
      })
    })

    after(() => {
      cy.exec(Cypress.env('cleanDB') + ' -d \'' + JSON.stringify({"user_email": user.email}) + '\'').then((result) => {
        cy.log("Delete response: " + result.stdout)
      })
    })

    beforeEach(() => {
      cy.login(user.email, user.password)
      cy.server()
      cy.route('GET', '**/lists/12345678-test-list-0001-abcdefghijkl', 'fx:list-settings/snapshot-response')
      cy.visit('/settings/12345678-test-list-0001-abcdefghijkl')
    })

    const sizes = Cypress.env("snapshotSizes");
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
