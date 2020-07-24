describe('Dashboard Page E2E Tests', () => {
  let listId = ""
  let userId = ""

  before(() => {
    cy.exec('python ' + Cypress.config().createUserScript + ' -e eweuser8+dashboard@gmail.com -n "Cypress TestDashboard"').then((result) => {
      userId = result.stdout
    })
    cy.login('eweuser8+dashboard@gmail.com', 'P4ssw0rd!')
  })

  after(() => {
    cy.exec('python ' + Cypress.config().deleteListScript + ' -l ' + listId + ' -u ' + userId)
    cy.exec('python ' + Cypress.config().deleteUserScript + ' -e eweuser8+dashboard@gmail.com')
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
    })
  })
})

describe('Dashboard Page Visual Regression tests', () => {
  const sizes = [
    'iphone-x',
    'ipad-2',
    ['ipad-2', 'landscape'],
    'macbook-13',
    [1920, 1080],
  ];
  const email = "eweuser8+authpages@gmail.com"

  before(() => {
    cy.exec('python ' + Cypress.config().createUserScript + ' -e ' + email + ' -n "Cypress AuthPages"')
  })

  after(() => {
    cy.exec('python ' + Cypress.config().deleteUserScript + ' -e ' + email)
  })

  beforeEach(() => {
    cy.login(email, 'P4ssw0rd!')

    // Fakes the API request so that we don't need to update the DB.
    cy.server()
    cy.route({
      method: 'GET',
      url: '/test/lists/',
      response: {
        "user": {
          "email":"eweuser8+authpages@gmail.com",
          "userId":"12345678-test-user-0001-abcdefghijkl",
          "name":"Cypress YourLists"
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
  })

  sizes.forEach((size) => {
    it(`Should match previous screenshot 'dashboard Page' When '${size}' resolution`, () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1])
      } else {
        cy.viewport(size)
      }

      cy.visit('/');

      cy.contains("Baby Gift List")

      cy.get('header').invoke('css', 'position', 'relative');
      cy.matchImageSnapshot(`Dashboard-${size}`);
    });
  });
});

describe('Create List Form Tests', () => {
  before(() => {
    cy.exec('python ' + Cypress.config().createUserScript + ' -e eweuser8+createlist@gmail.com -n "Cypress TestDashboard"')
    cy.login('eweuser8+createlist@gmail.com', 'P4ssw0rd!')
    cy.visit('/')
    cy.get('[data-cy=button-create-new-list]').click()
  })

  after(() => {
    cy.exec('python ' + Cypress.config().deleteUserScript + ' -e eweuser8+createlist@gmail.com')
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
  before(() => {
    cy.exec('python ' + Cypress.config().createUserScript + ' -e eweuser8+yourlists@gmail.com -n "Cypress YourLists"')
    cy.login('eweuser8+yourlists@gmail.com', 'P4ssw0rd!')

    // Fakes the API request so that we don't need to update the DB.
    cy.server()
    cy.route({
      method: 'GET',
      url: '/test/lists/',
      response: {
        "user": {
          "email":"eweuser8+yourlists@gmail.com",
          "userId":"12345678-test-user-0001-abcdefghijkl",
          "name":"Cypress YourLists"
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

  after(() => {
    cy.exec('python ' + Cypress.config().deleteUserScript + ' -e eweuser8+yourlists@gmail.com')
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
  before(() => {
    cy.exec('python ' + Cypress.config().createUserScript + ' -e eweuser8+yourlists2@gmail.com -n "Cypress YourLists"')
    cy.login('eweuser8+yourlists2@gmail.com', 'P4ssw0rd!')

    // Fakes the API request to prevent emails being sent unnecessarily.
    cy.server()
    cy.route({
      method: 'GET',
      url: '/test/lists/',
      response: {
        "user": {
          "email":"eweuser8+yourlists@gmail.com",
          "userId":"12345678-test-user-0001-abcdefghijkl",
          "name":"Cypress YourLists"
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

  after(() => {
    cy.exec('python ' + Cypress.config().deleteUserScript + ' -e eweuser8+yourlists2@gmail.com')
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
