import TestFilter from '../../support/TestFilter';

TestFilter(['smoke', 'regression'], () => {
  describe('Article Page - Not Authed - E2E Tests', () => {
    beforeEach(() => {
      cy.setCookie("CookieConsent", "true")
      cy.visit('/list-ideas/play-room-ideas')
    })

    it('should have create list button at bottom of article', () => {
        cy.get('[data-cy=create-list-button]').contains('Create List')
    })

    it('should have products with a signup and buy now buttons', () => {
      cy.get('[data-cy=product-card]').contains('Sign up to Create List')
      cy.get('[data-cy=product-card]').contains('Buy Now')

      cy.get('[data-cy=product-card]').eq(0).find('a').as('product_links')
      // Links 0 and 1 are link to product retailer page
      cy.get('@product_links').eq(2).should('have.attr', 'href', '/signup').contains('Sign up to Create List')
      cy.get('@product_links').eq(3).should('have.attr', 'href', 'https://totterandtumble.co.uk').contains('Buy Now')
    })
  })

  describe('Article Page - Authed - No List E2E Tests', () => {
    let seedResponse = {}
    let user = {}

    before(() => {
      cy.fixture('articles/no-list-e2e.json').then(fixture => {
        user = fixture.user
        cy.log("User email: " + user.email)
      })

      cy.exec(Cypress.env('seedDB') + ' -f cypress/fixtures/articles/no-list-e2e.json').then((result) => {
        seedResponse = JSON.parse(result.stdout)
        cy.log("User ID: " + seedResponse.user_id)
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
      cy.visit('/list-ideas/play-room-ideas')
    })

    it('should have products with a signup and buy now buttons', () => {
      // All products should have two buttons
      cy.get('[data-cy=product-card]').contains('Add To List')
      cy.get('[data-cy=product-card]').contains('Buy Now')

      // Product should have buy now button
      cy.get('[data-cy=product-card]').eq(0).find('a').as('product_links')
      cy.get('@product_links').eq(2).should('have.attr', 'href', 'https://totterandtumble.co.uk').contains('Buy Now')

      // Add to list button should open pop up
      cy.get('[data-cy=button-add-to-list]').eq(0).click()
      cy.get('[data-cy=popout-add-to-list]').contains('Add Item To List')
      cy.get('[data-cy=popout-add-to-list]').contains('You have no lists yet')
      cy.get('[data-cy=popout-add-to-list]').find('a').should('have.attr', 'href', '/?create').contains('Create a list')

      // Close Pop out
      cy.get('[data-cy=popout-close-button]').eq(0).click()
      cy.get('[data-cy=popout-add-to-list]').eq(0).should('have.css', "visibility", "hidden")
    })
  })

  describe('Article Page - Authed - Add To List E2E Test', () => {
    let seedResponse = {}
    let user = {}

    before(() => {
      cy.fixture('articles/add-to-list-e2e.json').then(fixture => {
        user = fixture.user
        cy.log("User email: " + user.email)
      })

      cy.exec(Cypress.env('seedDB') + ' -f cypress/fixtures/articles/add-to-list-e2e.json').then((result) => {
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
      cy.visit('/list-ideas/play-room-ideas')
    })

    it('should have products with a signup and buy now buttons', () => {
      // Product should have Add to list button
      cy.get('[data-cy=product-card]').eq(0).contains('Add To List')

      // Add to list button should open pop up
      cy.get('[data-cy=button-add-to-list]').eq(0).click()
      cy.get('[data-cy=popout-add-to-list]').eq(0).contains('Add Item To List')
      cy.get('[data-cy=popout-add-to-list]').eq(0).contains('Cypress Test Wish List')
      cy.get('[data-cy=popout-add-to-list]').eq(0).find('[data-cy=popout-button-add-action]').click()
      cy.get('[data-cy=popout-add-to-list]').eq(0).find('[data-cy=popout-added-icon]')
    })
  })
})

// We only snapshot the unauthed blog page.
// TODO: Add snapshot for authed blog page.
TestFilter(['regression'], () => {
  describe('Visual Snapshot Tests', () => {
    const page = 'article';
    const sizes = Cypress.env("snapshotSizes");

    beforeEach(() => {
      cy.setCookie("CookieConsent", "true")
    })

    sizes.forEach((size) => {
      it(`Should match previous screenshot when ${size} resolution`, () => {
        cy.setCookie("CookieConsent", "true")

        if (Cypress._.isArray(size)) {
          cy.viewport(size[0], size[1])
        } else {
          cy.viewport(size)
        }

        cy.visit('/list-ideas/play-room-ideas')

        cy.get('header').invoke('css', 'position', 'relative')
        Cypress.config('defaultCommandTimeout', 50000)
        cy.matchImageSnapshot(`${page}-${size}`)
      })
    })
  })
})
