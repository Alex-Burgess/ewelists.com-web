// Same links for now as Header White.  Only difference is visual snapshot tests.
// Header is only used on authenticated pages.

describe('Header White - Desktop - Authenticated', () => {
  before(() => {
    cy.exec('python ' + Cypress.config().createUserScript + ' -e eweuser8+headerwhite@gmail.com -n "Cypress TestHeaderWhite"')
  })

  after(() => {
    cy.exec('python ' + Cypress.config().deleteUserScript + ' -e eweuser8+headerwhite@gmail.com')
  })

  beforeEach(() => {
    cy.login('eweuser8+headerwhite@gmail.com', 'P4ssw0rd!')
    cy.task('resetCRI').visit('/')
  })

  it('Should have correct snapshot', () => {
    cy.get('[data-cy=header]').matchImageSnapshot('desktop-authed');
  })

  it('Should change css styles with hover', () => {
    cy.get('[data-cy=header-link-ideas]').should('have.css', "background-color", "rgba(0, 0, 0, 0)")
    cy.task('activateHoverPseudo', { selector: '[data-cy=header-link-ideas]' })
    cy.get('[data-cy=header-link-ideas]').should('have.css', "background-color", "rgba(255, 255, 255, 0.1)")
    cy.get('[data-cy=header]').matchImageSnapshot('desktop-link-hover');
  })

  it('Should show drop down', () => {
    cy.get('[data-cy=header-link-profile-dropdown]').click()
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
    cy.visit('/')
  })

  it('Should show sidebar', () => {
    cy.get('.MuiIconButton-root').click()
    cy.matchImageSnapshot('mobile-sidebar-authed');
  })
})
