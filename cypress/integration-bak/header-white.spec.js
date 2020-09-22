describe('Header White - Desktop - Non Authenticated', () => {
  beforeEach(() => {
    cy.setCookie("CookieConsent", "true")
    cy.task('resetCRI').visit('/contact')
  })

  it('Should have correct snapshot', () => {
    cy.get('[data-cy=header]').matchImageSnapshot('desktop');
  })

  it('Should have correct header links', () => {
    cy.get('[data-cy=header-link-logo]').should('have.attr', 'href', '/')
    cy.get('[data-cy=header-logo-blue]')
    cy.get('[data-cy=header-link-ideas]').should('have.attr', 'href', '/list-ideas')
    cy.get('[data-cy=header-link-login]').should('have.attr', 'href', '/login')
    cy.get('[data-cy=header-link-signup]').should('have.attr', 'href', '/signup')
  })

  it('Should change css styles with hover', () => {
    cy.get('[data-cy=header-link-login]').should('have.css', "background-color", "rgba(0, 0, 0, 0)")
    cy.task('activateHoverPseudo', { selector: '[data-cy=header-link-login]' })
    cy.get('[data-cy=header-link-login]').should('have.css', "background-color", "rgba(87, 117, 144, 0.15)")
    cy.get('[data-cy=header]').matchImageSnapshot('desktop-link-hover');
  })
})

describe('Header White - Mobile - Non Authenticated', () => {
  beforeEach(() => {
    cy.viewport('ipad-2')
    cy.setCookie("CookieConsent", "true")
    cy.visit('/contact')
  })

  it('Should have correct snapshot', () => {
    cy.get('[data-cy=header]').matchImageSnapshot('mobile');
  })

  it('Should have correct header links', () => {
    cy.get('[data-cy=header-link-logo]').should('have.attr', 'href', '/')
    cy.get('[data-cy=header-logo-blue]')
    cy.get('[data-cy=header-link-ideas]').should('have.attr', 'href', '/list-ideas')
    cy.get('[data-cy=header-link-login]').should('have.attr', 'href', '/login')
    cy.get('[data-cy=header-link-signup]').should('have.attr', 'href', '/signup')
  })

  it('Should show sidebar', () => {
    cy.get('.MuiIconButton-root').click()
    cy.matchImageSnapshot('mobile-sidebar');
  })
})

describe('Header White - Desktop - Authenticated', () => {
  before(() => {
    cy.exec('python ' + Cypress.config().createUserScript + ' -e eweuser8+headerwhite@gmail.com -n "Cypress TestHeaderWhite"')
  })

  after(() => {
    cy.exec('python ' + Cypress.config().deleteUserScript + ' -e eweuser8+headerwhite@gmail.com')
  })

  beforeEach(() => {
    cy.login('eweuser8+headerwhite@gmail.com', 'P4ssw0rd!')
    cy.visit('/contact')
  })

  it('Should have correct snapshot', () => {
    cy.get('[data-cy=header]').matchImageSnapshot('desktop-authed');
  })

  it('Should have correct header links', () => {
    cy.get('[data-cy=header-link-logo]').should('have.attr', 'href', '/')
    cy.get('[data-cy=header-logo-blue]')
    cy.get('[data-cy=header-link-your-lists]').should('have.attr', 'href', '/')
    cy.get('[data-cy=header-link-ideas]').should('have.attr', 'href', '/list-ideas')
    cy.get('[data-cy=header-link-profile-dropdown]')
  })

  it('Should show drop down', () => {
    cy.get('[data-cy=header-link-profile-dropdown]').click()
    cy.get('[data-cy=header-link-user-account]').should('have.attr', 'href', '/')
    cy.get('[data-cy=header-link-logout]').should('have.attr', 'href', '/logout')

    cy.task('activateHoverPseudo', { selector: '.dropdownItem' })
    cy.matchImageSnapshot('desktop-authed-dropdown');
  })
})

describe('Header White - Mobile - Authenticated', () => {
  before(() => {
    cy.exec('python ' + Cypress.config().createUserScript + ' -e eweuser8+headerwhite2@gmail.com -n "Cypress TestHeaderWhite2"')
  })

  after(() => {
    cy.exec('python ' + Cypress.config().deleteUserScript + ' -e eweuser8+headerwhite2@gmail.com')
  })

  beforeEach(() => {
    cy.viewport('ipad-2')
    cy.login('eweuser8+headerwhite2@gmail.com', 'P4ssw0rd!')
    cy.visit('/contact')
  })

  it('Should have correct footer links', () => {
    cy.get('[data-cy=header-link-logo]').should('have.attr', 'href', '/')
    cy.get('[data-cy=header-logo-blue]')
    cy.get('[data-cy=header-link-your-lists]').should('have.attr', 'href', '/')
    cy.get('[data-cy=header-link-ideas]').should('have.attr', 'href', '/list-ideas')
    cy.get('[data-cy=header-mobile-link-account]').should('have.attr', 'href', '/')
    cy.get('[data-cy=header-mobile-link-logout]').should('have.attr', 'href', '/logout')
  })

  it('Should show sidebar', () => {
    cy.get('.MuiIconButton-root').click()
    cy.matchImageSnapshot('mobile-sidebar-authed');
  })
})
