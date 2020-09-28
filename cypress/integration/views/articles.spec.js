import TestFilter from '../../support/TestFilter';

TestFilter(['smoke', 'regression'], () => {
  describe('Article Page - Not Authed Tests', () => {
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

  describe('Article Page - Authed Tests', () => {
    const userEmail = "eweuser8+article@gmail.com"
    const userName = '"Test Article-Page"'

    before(() => {
      cy.exec(Cypress.env('createUserScript') + ' -e ' + userEmail + ' -n ' + userName + ' -U ' + Cypress.env("userPoolId"))
    })

    after(() => {
      cy.exec(Cypress.env('deleteUserScript') + ' -e ' + userEmail + ' -U ' + Cypress.env("userPoolId") + ' -t ' + Cypress.env("listsTable"))
    })

    beforeEach(() => {
      cy.login(userEmail, Cypress.env('testUserPassword'))
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

  describe('Article Page - E2E Add To List Test', () => {
    const userEmail = "eweuser8+article@gmail.com"
    const userName = '"Test Article-Page"'
    let userId = ""
    let listId = ""

    before(() => {
      cy.exec(Cypress.env('createUserScript') + ' -e ' + userEmail + ' -n ' + userName + ' -U ' + Cypress.env("userPoolId")).then((result) => {
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
      cy.visit('/list-ideas/play-room-ideas')
    })

    it('should have products with a signup and buy now buttons', () => {
      // Product should have Add to list button
      cy.get('[data-cy=product-card]').eq(0).contains('Add To List')

      // Add to list button should open pop up
      cy.get('[data-cy=button-add-to-list]').eq(0).click()
      cy.get('[data-cy=popout-add-to-list]').eq(0).contains('Add Item To List')
      cy.get('[data-cy=popout-add-to-list]').eq(0).contains('Cypress Test Gift List')
      cy.get('[data-cy=popout-add-to-list]').eq(0).find('[data-cy=popout-button-add-action]').click()
      cy.get('[data-cy=popout-add-to-list]').eq(0).find('[data-cy=popout-added-icon]')
    })
  })
})


// Not sure what, if at all, visual tests to do.  maybe just some components.
// Maybe will just accept blog can change and will screenshot whole thing.  using smallest blog post.

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
