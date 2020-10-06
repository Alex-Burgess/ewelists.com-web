import TestFilter from '../../support/TestFilter';

TestFilter(['smoke', 'regression'], () => {
  describe('Edit List E2E Tests', () => {
    let seedResponse = {}
    let user = {}

    before(() => {
      cy.fixture('edit-list/seed-e2e.json').then(fixture => {
        user = fixture.user
        cy.log("User email: " + user.email)
      })

      cy.exec(Cypress.env('seedDB') + ' -f cypress/fixtures/edit-list/seed-e2e.json').then((result) => {
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
      cy.visit('/edit/' + seedResponse.list_id);
    })

    it('Adds notfound item.', () => {
      cy.get('#AddItems').click()
      cy.get('#searchUrl').scrollIntoView({offset: {top: 600, left: 0}}).should('be.visible')
      cy.get('#searchUrl').type('https://notfound.com')
      cy.get('[data-cy=button-search-product]').click()

      // Complete form to add product
      cy.get('#brand').type('Local Brand')
      cy.get('#details').type('Scooter')
      cy.get('[data-cy=button-add-notfound-gift]').click()

      // Check gift added to table
      cy.get('table').contains('tr', 'Local Brand')

      // Add product to object for cleanup
      cy.get('[data-cy=table-edit-products]').contains('tr', 'Local Brand').within(($product) => {
        cy.get('td').eq(0).get('div').invoke('attr', 'id').then((id) => {
          cy.log("Created Notfound product Id: " + id)
          seedResponse['product_ids'].push(id)
        })
      })
    })

    it('Edits notfound item.', () => {
      cy.get('table').contains('tr', 'John Lewis').within(elem => {
        cy.contains('Trike')
        cy.get('[data-cy=link-image]').click()
      });

      cy.get('[data-cy=popout-edit-' + seedResponse['product_ids'][0] + ']').within(($product) => {
        cy.get('[data-cy=link-quantity-decrease]').click()
        cy.get('[data-cy=popout-button-update]').click()
      })

      cy.get('table').contains('tr', '1')
    })

    it('Deletes notfound item.', () => {
      cy.get('table').contains('tr', 'John Lewis').within(elem => {
        cy.contains('Trike')
        cy.get('[data-cy=link-image]').click()
      });

      cy.get('[data-cy=popout-edit-' + seedResponse['product_ids'][0] + ']').within(($product) => {
        cy.get('[data-cy=link-quantity-decrease]').click()
        cy.get('[data-cy=popout-button-delete]').click()
      })

      cy.get('table').contains('tr', 'John Lewis').should('not.exist')
    })

    it('Adds found item.', () => {
      cy.get('[data-cy=button-add-item]').click()
      cy.get('#searchUrl').scrollIntoView({offset: {top: 600, left: 0}}).should('be.visible')
      cy.get('#searchUrl').type('https://www.amazon.co.uk/dp/B07DJ5KX53/')
      cy.get('[data-cy=button-search-product]').click()

      // Complete form to add product
      cy.get('[data-cy=button-add-found-gift]').click()

      // Check gift added to table
      cy.get('table').contains('tr', 'BABYBJÖRN')
    })

    it('Edits found item.', () => {
      cy.get('table').contains('tr', 'Tender Leaf Toys').within(elem => {
        cy.contains('Forest Chair')
        cy.get('[data-cy=link-image]').click()
      });

      cy.get('[data-cy=popout-edit-' + seedResponse['product_ids'][2] + ']').within(($product) => {
        cy.get('[data-cy=link-quantity-decrease]').click()
        cy.get('[data-cy=popout-button-update]').click()
      })
    })

    it('Deletes found item.', () => {
      cy.get('table').contains('tr', 'Tender Leaf Toys').within(elem => {
        cy.contains('Forest Chair')
        cy.get('[data-cy=link-image]').click()
      });

      cy.get('[data-cy=popout-edit-' + seedResponse['product_ids'][2] + ']').within(($product) => {
        cy.get('[data-cy=link-quantity-decrease]').click()
        cy.get('[data-cy=popout-button-delete]').click()
      })

      cy.get('table').contains('tr', 'Tender Leaf Toys').should('not.exist')
    })
  })
})

TestFilter(['regression'], () => {
  describe('Edit List Page Visual Regression tests', () => {
    let user = {}

    before(() => {
      cy.fixture('edit-list/snapshot-seed.json').then(fixture => {
        user = fixture.user
        cy.log("User email: " + user.email)
      })

      cy.exec(Cypress.env('seedDB') + ' -f cypress/fixtures/edit-list/snapshot-seed.json').then((result) => {
        const seedResponse = JSON.parse(result.stdout)
        cy.log("User ID: " + seedResponse.user_id)
      })
    })

    after(() => {
      cy.exec(Cypress.env('cleanDB') + ' -d \'' + JSON.stringify({"user_email": user.email}) + '\'').then((result) => {
        cy.log("Delete response: " + result.stdout)
      })
    })

    beforeEach(() => {
      cy.login(user.email, user.password)

      // Fakes the API request so that we don't need to update the DB.
      cy.server()
      cy.route('GET', '**/lists/12345678-test-list-0001-abcdefghijkl', 'fx:edit-list/get-list-response')
      cy.route('GET', '**/products/12345678-prod-t001-1234-abcdefghijkl', 'fx:edit-list/get-product-1-response')
      cy.route('GET', '**/products/12345678-prod-t034-1234-abcdefghijkl', 'fx:edit-list/get-product-2-response')
      cy.route('GET', '**/products/12345678-blog-e007-1234-abcdefghijkl', 'fx:edit-list/get-product-3-response')

      cy.visit('/edit/12345678-test-list-0001-abcdefghijkl');
    })

    const sizes = Cypress.env("snapshotSizes");
    sizes.forEach((size) => {
      it(`Should match previous screenshot 'edit list Page' When '${size}' resolution`, () => {
        if (Cypress._.isArray(size)) {
          cy.viewport(size[0], size[1])
        } else {
          cy.viewport(size)
        }
        Cypress.config('defaultCommandTimeout', 100000);
        cy.contains("Mamas & Papas")  // Wait for last product to load

        // Snapshot main view
        cy.get('header').invoke('css', 'position', 'relative');
        cy.matchImageSnapshot(`Edit-List-${size}`);

        // snapshot reserved setion
        cy.get("#Reserved").click()
        cy.contains("RESERVED GIFTS")
        cy.get("#navTabContainer").matchImageSnapshot(`Edit-Reserved-${size}`);

        // snapshot Add items setion
        cy.get("[id='Add Items']").click()
        cy.get("#searchUrl")
        cy.get("#navTabContainer").matchImageSnapshot(`Edit-Add-${size}`);
      });
    });
  });

  describe('Social Links', () => {
    let user = {}
    let listId = '12345678-test-list-0001-abcdefghijkl'

    before(() => {
      cy.fixture('edit-list/snapshot-seed.json').then(fixture => {
        user = fixture.user
        cy.log("User email: " + user.email)
      })

      cy.exec(Cypress.env('seedDB') + ' -f cypress/fixtures/edit-list/snapshot-seed.json').then((result) => {
        const seedResponse = JSON.parse(result.stdout)
        cy.log("User ID: " + seedResponse.user_id)
      })
    })

    after(() => {
      cy.exec(Cypress.env('cleanDB') + ' -d \'' + JSON.stringify({"user_email": user.email}) + '\'').then((result) => {
        cy.log("Delete response: " + result.stdout)
      })
    })

    beforeEach(() => {
      cy.login(user.email, user.password)

      // Fakes the API request so that we don't need to update the DB.
      cy.server()
      cy.route('GET', '**/lists/' + listId, 'fx:edit-list/get-list-response')
      cy.route('GET', '**/products/12345678-prod-t001-1234-abcdefghijkl', 'fx:edit-list/get-product-1-response')
      cy.route('GET', '**/products/12345678-prod-t034-1234-abcdefghijkl', 'fx:edit-list/get-product-2-response')
      cy.route('GET', '**/products/12345678-blog-e007-1234-abcdefghijkl', 'fx:edit-list/get-product-3-response')

      cy.visit('/edit/' + listId);
    })


    it('Should have correct email link', () =>{
      const mailto = 'mailto:?subject=' + user.name + ' shared a gift list with you&body=Hi!%0D%0A%0D%0AYou can view Baby Gift List at the link below if you wish to buy a gift:%0D%0A%0D%0A' + Cypress.config().baseUrl + '/lists/' + listId
      cy.get('[data-cy=link-mailto]').should('have.attr', 'href', mailto)
    })

    it('Should have correct share button', () =>{
      cy.get('[data-cy=button-fb]')
    })

    // Not sure why this is not working?
    it.skip('Should have correct share button', () =>{
      cy.get('[data-cy=button-share]').click()
      cy.get('[data-cy=button-share]').contains("Copied!")
    })

    it('Should have correct view link', () =>{
      cy.get('[data-cy=link-view]').should('have.attr', 'href', '/lists/' + listId)
    })

    it('Should have correct settings link', () =>{
      cy.get('[data-cy=link-settings]').should('have.attr', 'href', '/settings/' + listId)
    })
  })

  describe('Product Row Tests', () => {
    let user = {}

    before(() => {
      cy.fixture('edit-list/snapshot-seed.json').then(fixture => {
        user = fixture.user
        cy.log("User email: " + user.email)
      })

      cy.exec(Cypress.env('seedDB') + ' -f cypress/fixtures/edit-list/snapshot-seed.json').then((result) => {
        const seedResponse = JSON.parse(result.stdout)
        cy.log("User ID: " + seedResponse.user_id)
      })
    })

    after(() => {
      cy.exec(Cypress.env('cleanDB') + ' -d \'' + JSON.stringify({"user_email": user.email}) + '\'').then((result) => {
        cy.log("Delete response: " + result.stdout)
      })
    })

    beforeEach(() => {
      cy.login(user.email, user.password)

      // Fakes the API request so that we don't need to update the DB.
      cy.server()
      cy.route('GET', '**/lists/12345678-test-list-0001-abcdefghijkl', 'fx:edit-list/get-list-response')
      cy.route('GET', '**/products/12345678-prod-t001-1234-abcdefghijkl', 'fx:edit-list/get-product-1-response')
      cy.route('GET', '**/products/12345678-prod-t034-1234-abcdefghijkl', 'fx:edit-list/get-product-2-response')
      cy.route('GET', '**/products/12345678-blog-e007-1234-abcdefghijkl', 'fx:edit-list/get-product-3-response')

      cy.visit('/edit/12345678-test-list-0001-abcdefghijkl');
    })

    it('Should open edit popout when image clicked', () =>{
      cy.get('[data-cy=link-image]').first().click()
      cy.contains('John Lewis & Partners')
    })

    it('Should open edit popout when brand clicked', () =>{
      cy.get('[data-cy=link-brand]').eq(1).click()
      cy.contains('BABYBJÖRN')
    })

    it('Should open edit popout when edit button clicked', () =>{
      cy.get('[data-cy=link-edit]').eq(2).click()
      cy.contains('Mamas & Papas')
    })

    it('Should have correct product links on popout', () => {
      cy.get('[data-cy=link-image]').first().click()
      cy.contains('John Lewis & Partners')

      cy.get('[data-cy=link-product-image]').should('have.attr', 'href', 'https://www.johnlewis.com/john-lewis-partners-baby-cardigan/pink/p4875232').and('have.attr', 'target', '_blank')
      cy.get('[data-cy=link-product-brand]').should('have.attr', 'href', 'https://www.johnlewis.com/john-lewis-partners-baby-cardigan/pink/p4875232').and('have.attr', 'target', '_blank')
    })

    it('Should update displayed quantities', () => {
      cy.get('[data-cy=link-image]').eq(1).click()
      cy.contains('BABYBJÖRN')

      cy.get('[data-cy=div-quantity]').eq(1).contains("1")

      cy.get('[data-cy=link-quantity-increase]').eq(1).click()
      cy.get('[data-cy=div-quantity]').eq(1).contains("2")

      cy.get('[data-cy=link-quantity-decrease]').eq(1).click()
      cy.get('[data-cy=div-quantity]').eq(1).contains("1")

      // Cannot have less than 1
      cy.get('[data-cy=link-quantity-decrease]').eq(1).click()
      cy.get('[data-cy=div-quantity]').eq(1).contains("1")
    })
  })
})
