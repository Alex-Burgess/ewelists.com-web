import TestFilter from '../../support/TestFilter';

TestFilter(['smoke', 'regression'], () => {
  describe('Dashboard Page E2E Tests', () => {
    const userEmail = "eweuser8+dashboard@gmail.com"
    const userName = '"Test Dashboard-E2E"'
    let listId = ""
    let userId = ""

    before(() => {
      cy.exec(Cypress.env('createUserScript') + ' -e ' + userEmail + ' -n ' + userName + ' -U ' + Cypress.env("userPoolId")).then((result) => {
        userId = result.stdout
      })
    })

    after(() => {
      cy.exec(Cypress.env('deleteListScript') + ' -l ' + listId + ' -u ' + userId + ' -t ' + Cypress.env("listsTable"))
      cy.exec(Cypress.env('deleteUserScript') + ' -e ' + userEmail + ' -U ' + Cypress.env("userPoolId") + ' -t ' + Cypress.env("listsTable"))
    })

    beforeEach(() => {
      cy.login(userEmail, Cypress.env('testUserPassword'))
    })

    it('creates new list', () => {
      cy.visit('/')
      cy.contains("Your Lists")
      cy.get('[data-cy=button-create-new-list]').click()

      // Complete form
      cy.get('#title').type("Baby Shower Test List").should('have.value', "Baby Shower Test List")
      cy.get('.datepicker').click();
      cy.contains('24').click();
      cy.get('#mui-component-select-occasion').click()
      cy.contains('Baby Shower').click();
      cy.get('#description').type("A test list").should('have.value', "A test list")

      // Submit form and check list created
      cy.get('[data-cy=button-create-list]').click()
      cy.contains('Baby Shower Test List')
      cy.url().should('include', '/edit/')

      // Get list id for use in delete script
      cy.url().then(url => {
        listId = url.split('/edit/')[1]
        cy.log("Created List ID: " + listId)
      })
    })
  })
})

TestFilter(['regression'], () => {
  describe('Dashboard Page Visual Regression tests', () => {
    const userEmail = "eweuser8+dashboard@gmail.com"
    const userName = '"Test Dashboard-Page"'

    const sizes = Cypress.env("snapshotSizes");

    before(() => {
      cy.exec(Cypress.env('createUserScript') + ' -e ' + userEmail + ' -n ' + userName + ' -U ' + Cypress.env("userPoolId"))
    })

    after(() => {
      cy.exec(Cypress.env('deleteUserScript') + ' -e ' + userEmail + ' -U ' + Cypress.env("userPoolId") + ' -t ' + Cypress.env("listsTable"))
    })

    beforeEach(() => {
      cy.login(userEmail, Cypress.env('testUserPassword'))

      // Fakes the API request so that we don't need to update the DB.
      cy.server()
      cy.route({
        method: 'GET',
        url: '/' + Cypress.env('environment') + '/lists/',
        response: {
          "user": {
            "email": userEmail,
            "userId":"12345678-test-user-0001-abcdefghijkl",
            "name": userName
          },
          "owned":[{
            "listId":"12345678-test-list-0001-abcdefghijkl",
            "title":"Baby Gift List",
            "description":"Some gift ideas",
            "occasion":"Baby Shower",
            "imageUrl":"https://test.ewelists.com/images/babyshower-default.jpg",
            "listOwner":"12345678-test-user-0001-abcdefghijkl",
            "state":"open",
            "eventDate":"31 July 2020"
          }],
          "closed":[]
        }
      })

      cy.visit('/');
    })

    sizes.forEach((size) => {
      it(`Should match previous screenshot 'dashboard Page' When '${size}' resolution`, () => {
        if (Cypress._.isArray(size)) {
          cy.viewport(size[0], size[1])
        } else {
          cy.viewport(size)
        }

        cy.contains("Baby Gift List")

        cy.get('header').invoke('css', 'position', 'relative');
        cy.matchImageSnapshot(`Dashboard-${size}`);
      });
    });
  });

  describe('Create List Form Tests', () => {
    const userEmail = "eweuser8+dashboard@gmail.com"
    const userName = '"Test Dashboard-CreateForm"'

    before(() => {
      cy.exec(Cypress.env('createUserScript') + ' -e ' + userEmail + ' -n ' + userName + ' -U ' + Cypress.env("userPoolId"))
    })

    beforeEach(() => {
      cy.login(userEmail, Cypress.env('testUserPassword'))
      cy.visit('/')
      cy.get('[data-cy=button-create-new-list]').click()
    })

    after(() => {
      cy.exec(Cypress.env('deleteUserScript') + ' -e ' + userEmail + ' -U ' + Cypress.env("userPoolId") + ' -t ' + Cypress.env("listsTable"))
    })

    it('Should have inactive form button when not complete', () => {
      cy.get('.signUpCard').matchImageSnapshot('create-list-form-empty')

      cy.get('#title').type("Baby Shower Test List").should('have.value', "Baby Shower Test List")
      cy.get('[data-cy=button-create-list]').should('have.css', "pointer-events", "none")

      cy.get('.datepicker').click();
      cy.contains('24').click();
      cy.get('[data-cy=button-create-list]').should('have.css', "pointer-events", "none")

      cy.get('#mui-component-select-occasion').click()
      cy.contains('Baby Shower').click();
      cy.get('[data-cy=button-create-list]').should('have.css', "pointer-events", "none")

      cy.get('#description').type("Baby Shower Test List").should('have.value', "Baby Shower Test List")
      cy.get('[data-cy=button-create-list]').should('have.css', "pointer-events", "auto")

      cy.get('.signUpCard').matchImageSnapshot('create-list-form-complete')
    })

    it('Should close create form', () => {
      cy.get('[data-cy=button-form-close]').click()
    })
  })

  describe('Open List Item Tests', () => {
    const userEmail = "eweuser8+dashboard@gmail.com"
    const userName = '"Test Dashboard-OpenList"'

    before(() => {
      cy.exec(Cypress.env('createUserScript') + ' -e ' + userEmail + ' -n ' + userName + ' -U ' + Cypress.env("userPoolId"))
    })

    after(() => {
      cy.exec(Cypress.env('deleteUserScript') + ' -e ' + userEmail + ' -U ' + Cypress.env("userPoolId") + ' -t ' + Cypress.env("listsTable"))
    })

    beforeEach(() => {
      cy.login(userEmail, Cypress.env('testUserPassword'))

      // Fakes the API request so that we don't need to update the DB.
      cy.server()
      cy.route({
        method: 'GET',
        url: '/' + Cypress.env('environment') + '/lists/',
        response: {
          "user": {
            "email": userEmail,
            "userId":"12345678-test-user-0001-abcdefghijkl",
            "name": userName
          },
          "owned":[{
            "listId":"12345678-test-list-0001-abcdefghijkl",
            "title":"Baby Gift List",
            "description":"Some gift ideas",
            "occasion":"Baby Shower",
            "imageUrl":"https://test.ewelists.com/images/babyshower-default.jpg",
            "listOwner":"12345678-test-user-0001-abcdefghijkl",
            "state":"open",
            "eventDate":"31 July 2020"
          }],
          "closed":[]
        }
      })

      cy.visit('/')
    })

    it('Should match snapshot of dashboard with one list', () => {
      cy.contains('Baby Gift List')
      cy.get('header').invoke('css', 'position', 'relative');
      cy.get('[data-cy=your-lists]').matchImageSnapshot('dashboard-with-one-list')
    })

    it('Should have correct view list link', () => {
      cy.get('[data-cy=link-view-list]').should('have.attr', 'href', '/lists/12345678-test-list-0001-abcdefghijkl')
    })

    it('Should have correct edit list link', () => {
      cy.get('[data-cy=link-edit-list]').should('have.attr', 'href', '/edit/12345678-test-list-0001-abcdefghijkl')
    })

    it('Should have correct image link', () => {
      cy.get('[data-cy=link-image]').should('have.attr', 'href', '/edit/12345678-test-list-0001-abcdefghijkl')
    })

    it('Should have correct header link', () => {
      cy.get('[data-cy=link-header]').should('have.attr', 'href', '/edit/12345678-test-list-0001-abcdefghijkl')
    })
  })

  describe('Closed List Item Tests', () => {
    const userEmail = "eweuser8+dashboard@gmail.com"
    const userName = '"Test Dashboard-ClosedList"'

    before(() => {
      cy.exec(Cypress.env('createUserScript') + ' -e ' + userEmail + ' -n ' + userName + ' -U ' + Cypress.env("userPoolId"))
    })

    after(() => {
      cy.exec(Cypress.env('deleteUserScript') + ' -e ' + userEmail + ' -U ' + Cypress.env("userPoolId") + ' -t ' + Cypress.env("listsTable"))
    })

    beforeEach(() => {
      cy.login(userEmail, Cypress.env('testUserPassword'))

      // Fakes the API request so that we don't need to update the DB.
      cy.server()
      cy.route({
        method: 'GET',
        url: '/' + Cypress.env('environment') + '/lists/',
        response: {
          "user": {
            "email": userEmail,
            "userId":"12345678-test-user-0001-abcdefghijkl",
            "name": userName
          },
          "owned":[],
          "closed":[{
            "listId":"12345678-test-list-0001-abcdefghijkl",
            "title":"Baby Gift List",
            "description":"Some gift ideas",
            "occasion":"Baby Shower",
            "imageUrl":"https://test.ewelists.com/images/babyshower-closed.jpg",
            "listOwner":"12345678-test-user-0001-abcdefghijkl",
            "state":"closed",
            "eventDate":"31 July 2020"
          }]
        }
      })

      cy.visit('/')
    })

    it('Should match snapshot of dashboard with one list', () => {
      cy.contains('Baby Gift List')
      cy.get('header').invoke('css', 'position', 'relative');
      cy.get('[data-cy=your-lists]').matchImageSnapshot('dashboard-with-closed-list')
    })

    it('Should have correct details link', () => {
      cy.get('[data-cy=link-closed-edit-list]').should('have.attr', 'href', '/edit/12345678-test-list-0001-abcdefghijkl')
    })

    it('Should have correct image link', () => {
      cy.get('[data-cy=link-closed-image]').should('have.attr', 'href', '/edit/12345678-test-list-0001-abcdefghijkl')
    })

    it('Should have correct header link', () => {
      cy.get('[data-cy=link-closed-header]').should('have.attr', 'href', '/edit/12345678-test-list-0001-abcdefghijkl')
    })
  })
})
