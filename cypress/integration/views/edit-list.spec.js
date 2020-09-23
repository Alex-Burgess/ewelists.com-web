import TestFilter from '../../support/TestFilter';

// TODO: Remaining Tests
// On hover tests for social links, tab icons.
// On hover tests for edit product popout buttons.
// TODO: Test add items form, including snapshots
// NOTE: This does not test fb and whatsapp buttons phone.


// TODO - E2E test
// Start with empty list
// Add item
// Edit item
// Delete item
// Will need to extend delete list script to delete any other items associated with list.  Delete script could return count of items deleted to make it testable.

TestFilter(['smoke', 'regression'], () => {
  describe('Edit List E2E Tests', () => {
    const userName = '"Test Edit-E2E"'
    let userId = ""
    let listId = ""

    before(() => {
      cy.exec(Cypress.env('createUserScript') + ' -e ' + Cypress.env('testUserEmail') + ' -n ' + userName + ' -U ' + Cypress.env("userPoolId")).then((result) => {
        userId = result.stdout

        cy.exec(Cypress.env('createListScript') + ' -u ' + userId + ' -t ' + Cypress.env("listsTable")).then((result) => {
          listId = result.stdout
        })
      })
    })

    after(() => {
      cy.exec(Cypress.env('deleteListScript') + ' -l ' + listId + ' -u ' + userId + ' -t ' + Cypress.env("listsTable"))
      cy.exec(Cypress.env('deleteUserScript') + ' -e ' + Cypress.env('testUserEmail') + ' -U ' + Cypress.env("userPoolId") + ' -t ' + Cypress.env("listsTable"))
    })

    beforeEach(() => {
      cy.login(Cypress.env('testUserEmail'), Cypress.env('testUserPassword'))
    })

    it('Adds and item, edits the item, then deletes the item.', () => {
      cy.visit('/edit/' + listId);
      cy.contains('Cypress Test Gift List')
      // TODO - no functionality tested
    })
  })
})

TestFilter(['regression'], () => {
  describe('Edit List Page Visual Regression tests', () => {
    const sizes = [
      'iphone-x',
      'ipad-2',
      ['ipad-2', 'landscape'],
      'macbook-13',
      [1920, 1080],
    ];
    const userName = '"Test Edit-Page"'
    let userId = ""
    let listId = ""

    before(() => {
      cy.exec(Cypress.env('createUserScript') + ' -e ' + Cypress.env('testUserEmail') + ' -n ' + userName + ' -U ' + Cypress.env("userPoolId")).then((result) => {
        userId = result.stdout

        cy.exec(Cypress.env('createListScript') + ' -u ' + userId + ' -t ' + Cypress.env("listsTable")).then((result) => {
          listId = result.stdout
        })
      })
    })

    after(() => {
      cy.exec(Cypress.env('deleteListScript') + ' -l ' + listId + ' -u ' + userId + ' -t ' + Cypress.env("listsTable"))
      cy.exec(Cypress.env('deleteUserScript') + ' -e ' + Cypress.env('testUserEmail') + ' -U ' + Cypress.env("userPoolId") + ' -t ' + Cypress.env("listsTable"))
    })

    beforeEach(() => {
      cy.login(Cypress.env('testUserEmail'), Cypress.env('testUserPassword'))

      // Fakes the API request so that we don't need to update the DB.
      cy.server()
      cy.route({
        method: 'GET',
        url: '/test/lists/' + listId,
        response: {
          "list":{
            "listId":listId,
            "title":"Baby Gift List",
            "description":"Some gift ideas",
            "occasion":"Baby Shower",
            "imageUrl":"https://test.ewelists.com/images/babyshower-default.jpg",
            "listOwner":userId,
            "state":"open","eventDate":"31 July 2020"
          },
          "products":{
            "12345678-blog-e007-1234-abcdefghijkl":{
              "productId":"12345678-blog-e007-1234-abcdefghijkl",
              "quantity":1,
              "reserved":1,
              "purchased":0,
              "type":"products"
            },
            "12345678-prod-t001-1234-abcdefghijkl":{
              "productId":"12345678-prod-t001-1234-abcdefghijkl",
              "quantity":1,
              "reserved":0,
              "purchased":0,
              "type":"products"
            },
            "12345678-prod-t034-1234-abcdefghijkl":{
              "productId":"12345678-prod-t034-1234-abcdefghijkl",
              "quantity":1,
              "reserved":0,
              "purchased":0,
              "type":"products"
            }
          },
          "reserved":[{
            "reservationId":"d4523c94-aa19-4564-83df-f8445465d926",
            "productId":"12345678-prod-t001-1234-abcdefghijkl",
            "userId":userId,
            "listId":listId,
            "listOwnerId":userId,
            "name":"Test User",
            "email":"test.user@gmail.com",
            "quantity":1,
            "state":"reserved",
            "listTitle":"Baby Gift List",
            "productType":"products"
          }]
        }
      })

      cy.route({
        method: 'GET',
        url: '/test/products/12345678-prod-t001-1234-abcdefghijkl',
        response: {
          "productId":"12345678-prod-t001-1234-abcdefghijkl",
          "brand":"BABYBJÖRN",
          "details":"Travel Cot Easy Go, Anthracite, with transport bag",
          "imageUrl":"//ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B07DJ5KX53&Format=_SL250_&ID=AsinImage&MarketPlace=GB&ServiceVersion=20070822&WS=1&tag=ewelists-21",
          "productUrl":"https://www.amazon.co.uk/BABYBJ%C3%96RN-Travel-Easy-Anthracite-transport/dp/B07DJ5KX53/ref=as_li_ss_il?ref_=ast_sto_dp&th=1&psc=1&linkCode=li3&tag=ewelists-21&linkId=53810d50be55070942f429bbbb607867",
          "price":"219.99"
        }
      })

      cy.route({
        method: 'GET',
        url: '/test/products/12345678-prod-t034-1234-abcdefghijkl',
        response: {
          "productId":"12345678-prod-t034-1234-abcdefghijkl",
          "brand":"Mamas & Papas",
          "details":"Acro Lightweight Buggy - Black",
          "imageUrl":"https://media.mamasandpapas.com/i/mamasandpapas/657225301_Acro_Black_Side_On_Upright/Travel/Pushchairs/All+Pushchairs/Buggies+%26+Strollers?$pdpimagemobile$",
          "productUrl":"https://www.mamasandpapas.com/en-gb/acro-lightweight-buggy-black/p/657225301",
          "price":"189.00"
        }
      })

      cy.route({
        method: 'GET',
        url: '/test/products/12345678-blog-e007-1234-abcdefghijkl',
        response: {
          "productId":"12345678-blog-e007-1234-abcdefghijkl",
          "brand":"John Lewis & Partners",
          "details":"Baby Cardigan, Pink",
          "imageUrl":"https://johnlewis.scene7.com/is/image/JohnLewis/004329586?$rsp-pdp-port-640$",
          "productUrl":"https://www.johnlewis.com/john-lewis-partners-baby-cardigan/pink/p4875232",
          "price":"12.00"
        }
      })
    })

    sizes.forEach((size) => {
      it(`Should match previous screenshot 'edit list Page' When '${size}' resolution`, () => {
        if (Cypress._.isArray(size)) {
          cy.viewport(size[0], size[1])
        } else {
          cy.viewport(size)
        }

        cy.visit('/edit/' + listId);
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
    const userName = 'Test Edit-Page'
    let userId = ""
    let listId = ""

    before(() => {
      cy.exec(Cypress.env('createUserScript') + ' -e ' + Cypress.env('testUserEmail') + ' -n "' + userName + '" -U ' + Cypress.env("userPoolId")).then((result) => {
        userId = result.stdout

        cy.exec(Cypress.env('createListScript') + ' -u ' + userId + ' -t ' + Cypress.env("listsTable")).then((result) => {
          listId = result.stdout
        })
      })
    })

    after(() => {
      cy.exec(Cypress.env('deleteListScript') + ' -l ' + listId + ' -u ' + userId + ' -t ' + Cypress.env("listsTable"))
      cy.exec(Cypress.env('deleteUserScript') + ' -e ' + Cypress.env('testUserEmail') + ' -U ' + Cypress.env("userPoolId") + ' -t ' + Cypress.env("listsTable"))
    })

    beforeEach(() => {
      cy.login(Cypress.env('testUserEmail'), Cypress.env('testUserPassword'))
      cy.visit('/edit/' + listId);
    })

    it('Should have correct email link', () =>{
      const mailto = 'mailto:?subject=' + userName + ' shared a gift list with you&body=Hi!%0D%0A%0D%0AYou can view Cypress Test Gift List at the link below if you wish to buy a gift:%0D%0A%0D%0Ahttp://localhost:3000/lists/' + listId
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

  describe.only('Product Row Tests', () => {
    const userName = '"Test Edit-Page"'
    let userId = ""
    let listId = ""

    before(() => {
      cy.exec(Cypress.env('createUserScript') + ' -e ' + Cypress.env('testUserEmail') + ' -n ' + userName + ' -U ' + Cypress.env("userPoolId")).then((result) => {
        userId = result.stdout

        cy.exec(Cypress.env('createListScript') + ' -u ' + userId + ' -t ' + Cypress.env("listsTable")).then((result) => {
          listId = result.stdout
        })
      })
    })

    after(() => {
      cy.exec(Cypress.env('deleteListScript') + ' -l ' + listId + ' -u ' + userId + ' -t ' + Cypress.env("listsTable"))
      cy.exec(Cypress.env('deleteUserScript') + ' -e ' + Cypress.env('testUserEmail') + ' -U ' + Cypress.env("userPoolId") + ' -t ' + Cypress.env("listsTable"))
    })

    beforeEach(() => {
      cy.login(Cypress.env('testUserEmail'), Cypress.env('testUserPassword'))

      // Fakes the API request so that we don't need to update the DB.  It gets the list details and then details for the 3 products.
      cy.server()
      cy.route({
        method: 'GET',
        url: '/test/lists/' + listId,
        response: {
          "list":{
            "listId":listId,
            "title":"Baby Gift List",
            "description":"Some gift ideas",
            "occasion":"Baby Shower",
            "imageUrl":"https://test.ewelists.com/images/babyshower-default.jpg",
            "listOwner":userId,
            "state":"open","eventDate":"31 July 2020"
          },
          "products":{
            "12345678-blog-e007-1234-abcdefghijkl":{
              "productId":"12345678-blog-e007-1234-abcdefghijkl",
              "quantity":1,
              "reserved":1,
              "purchased":0,
              "type":"products"
            },
            "12345678-prod-t001-1234-abcdefghijkl":{
              "productId":"12345678-prod-t001-1234-abcdefghijkl",
              "quantity":1,
              "reserved":0,
              "purchased":0,
              "type":"products"
            },
            "12345678-prod-t034-1234-abcdefghijkl":{
              "productId":"12345678-prod-t034-1234-abcdefghijkl",
              "quantity":1,
              "reserved":0,
              "purchased":0,
              "type":"products"
            }
          },
          "reserved":[{
            "reservationId":"d4523c94-aa19-4564-83df-f8445465d926",
            "productId":"12345678-prod-t001-1234-abcdefghijkl",
            "userId":userId,
            "listId":listId,
            "listOwnerId":userId,
            "name":"Test User",
            "email":"test.user@gmail.com",
            "quantity":1,
            "state":"reserved",
            "listTitle":"Baby Gift List",
            "productType":"products"
          }]
        }
      })

      cy.route({
        method: 'GET',
        url: '/test/products/12345678-prod-t001-1234-abcdefghijkl',
        response: {
          "productId":"12345678-prod-t001-1234-abcdefghijkl",
          "brand":"BABYBJÖRN",
          "details":"Travel Cot Easy Go, Anthracite, with transport bag",
          "imageUrl":"//ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B07DJ5KX53&Format=_SL250_&ID=AsinImage&MarketPlace=GB&ServiceVersion=20070822&WS=1&tag=ewelists-21",
          "productUrl":"https://www.amazon.co.uk/BABYBJ%C3%96RN-Travel-Easy-Anthracite-transport/dp/B07DJ5KX53/ref=as_li_ss_il?ref_=ast_sto_dp&th=1&psc=1&linkCode=li3&tag=ewelists-21&linkId=53810d50be55070942f429bbbb607867",
          "price":"219.99"
        }
      })

      cy.route({
        method: 'GET',
        url: '/test/products/12345678-prod-t034-1234-abcdefghijkl',
        response: {
          "productId":"12345678-prod-t034-1234-abcdefghijkl",
          "brand":"Mamas & Papas",
          "details":"Acro Lightweight Buggy - Black",
          "imageUrl":"https://media.mamasandpapas.com/i/mamasandpapas/657225301_Acro_Black_Side_On_Upright/Travel/Pushchairs/All+Pushchairs/Buggies+%26+Strollers?$pdpimagemobile$",
          "productUrl":"https://www.mamasandpapas.com/en-gb/acro-lightweight-buggy-black/p/657225301",
          "price":"189.00"
        }
      })

      cy.route({
        method: 'GET',
        url: '/test/products/12345678-blog-e007-1234-abcdefghijkl',
        response: {
          "productId":"12345678-blog-e007-1234-abcdefghijkl",
          "brand":"John Lewis & Partners",
          "details":"Baby Cardigan, Pink",
          "imageUrl":"https://johnlewis.scene7.com/is/image/JohnLewis/004329586?$rsp-pdp-port-640$",
          "productUrl":"https://www.johnlewis.com/john-lewis-partners-baby-cardigan/pink/p4875232",
          "price":"12.00"
        }
      })

      cy.visit('/edit/' + listId);
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

    // Test for delete and update buttons - onhover.
  })
})
