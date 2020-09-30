import TestFilter from '../../support/TestFilter';

TestFilter(['smoke', 'regression'], () => {
  describe('Dashboard Page E2E Tests', () => {
    let user = {}
    let seedResponse = {}
    let listData = {}

    before(() => {
      cy.fixture('dashboard/dashboard-e2e.json').then(fixture => {
        user = fixture.user
        listData = fixture.create_list_data
        cy.log("User email: " + user.email)
      })

      cy.exec(Cypress.env('seedDB') + ' -f cypress/fixtures/dashboard/dashboard-e2e.json').then((result) => {
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
    })

    it('creates new list', () => {
      cy.visit('/')
      cy.contains("Your Lists")
      cy.get('[data-cy=button-create-new-list]').click()

      // Complete form
      cy.get('#title').type(listData.title).should('have.value', listData.title)
      cy.get('.datepicker').click();
      cy.contains('24').click();
      cy.get('#mui-component-select-occasion').click()
      cy.contains(listData.occasion).click();
      cy.get('#description').type(listData.description).should('have.value', listData.description)

      // Submit form and check list created
      cy.get('[data-cy=button-create-list]').click()
      cy.contains(listData.title)
      cy.url().should('include', '/edit/')

      // Get list id for use in delete script
      cy.url().then(url => {
        const listId = url.split('/edit/')[1]
        seedResponse['list_id'] = listId
        cy.log("Created List ID: " + listId)
      })
    })
  })
})

TestFilter(['regression'], () => {
  describe('Dashboard Page Visual Regression tests', () => {
    let user = {}
    let seedResponse = {}

    before(() => {
      cy.fixture('dashboard/snapshot-seed.json').then(fixture => {
        user = fixture.user
        cy.log("User email: " + user.email)
      })

      cy.exec(Cypress.env('seedDB') + ' -f cypress/fixtures/dashboard/snapshot-seed.json').then((result) => {
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

      // Fakes the API request so that we don't need to update the DB.
      cy.server()
      cy.route('GET', '**/lists/', 'fx:dashboard/snapshot-response')
      cy.visit('/')
    })

    const sizes = Cypress.env("snapshotSizes");
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
    let user = {}
    let seedResponse = {}
    let listData = {}

    before(() => {
      cy.fixture('dashboard/dashboard-e2e.json').then(fixture => {
        user = fixture.user
        listData = fixture.create_list_data
        cy.log("User email: " + user.email)
      })

      cy.exec(Cypress.env('seedDB') + ' -f cypress/fixtures/dashboard/dashboard-e2e.json').then((result) => {
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
      cy.visit('/')
      cy.get('[data-cy=button-create-new-list]').click()
    })

    it('Should have inactive form button when not complete', () => {
      cy.get('.signUpCard').matchImageSnapshot('create-list-form-empty')

      cy.get('#title').type(listData.title).should('have.value', listData.title)
      cy.get('[data-cy=button-create-list]').should('have.css', "pointer-events", "none")

      cy.get('.datepicker').click();
      cy.contains('24').click();
      cy.get('[data-cy=button-create-list]').should('have.css', "pointer-events", "none")

      cy.get('#mui-component-select-occasion').click()
      cy.contains(listData.occasion).click();
      cy.get('[data-cy=button-create-list]').should('have.css', "pointer-events", "none")

      cy.get('#description').type(listData.description).should('have.value', listData.description)
      cy.get('[data-cy=button-create-list]').should('have.css', "pointer-events", "auto")

      cy.get('.signUpCard').matchImageSnapshot('create-list-form-complete')
    })

    it('Should close create form', () => {
      cy.get('[data-cy=button-form-close]').click()
    })
  })

  describe('Open List Item Tests', () => {
    let user = {}
    let seedResponse = {}

    before(() => {
      cy.fixture('dashboard/snapshot-seed.json').then(fixture => {
        user = fixture.user
        cy.log("User email: " + user.email)
      })

      cy.exec(Cypress.env('seedDB') + ' -f cypress/fixtures/dashboard/snapshot-seed.json').then((result) => {
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

      // Fakes the API request so that we don't need to update the DB.
      cy.server()
      cy.route('GET', '**/lists/', 'fx:dashboard/snapshot-response')
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
    let user = {}
    let seedResponse = {}

    before(() => {
      cy.fixture('dashboard/snapshot-seed.json').then(fixture => {
        user = fixture.user
        cy.log("User email: " + user.email)
      })

      cy.exec(Cypress.env('seedDB') + ' -f cypress/fixtures/dashboard/snapshot-seed.json').then((result) => {
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

      // Fakes the API request so that we don't need to update the DB.
      cy.server()
      cy.route('GET', '**/lists/', 'fx:dashboard/closed-response')
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
