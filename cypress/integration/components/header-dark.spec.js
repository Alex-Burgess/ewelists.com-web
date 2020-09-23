import TestFilter from '../../support/TestFilter';

// Same links for now as Header White.  Only difference is visual snapshot tests.
// Header is only used on authenticated pages.

TestFilter(['regression'], () => {
  describe('Header Dark - Desktop - Authenticated', () => {
    const userName = '"Test Header-Dark-Desktop"'

    before(() => {
      cy.exec(Cypress.env('createUserScript') + ' -e ' + Cypress.env('testUserEmail') + ' -n ' + userName + ' -U ' + Cypress.env("userPoolId"))
    })

    after(() => {
      cy.exec(Cypress.env('deleteUserScript') + ' -e ' + Cypress.env('testUserEmail') + ' -U ' + Cypress.env("userPoolId") + ' -t ' + Cypress.env("listsTable"))
    })

    beforeEach(() => {
      cy.login(Cypress.env('testUserEmail'), Cypress.env('testUserPassword'))
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

  describe('Header Dark - Mobile - Authenticated', () => {
    const userName = '"Test Header-Dark-Mobile"'

    before(() => {
      cy.exec(Cypress.env('createUserScript') + ' -e ' + Cypress.env('testUserEmail') + ' -n ' + userName + ' -U ' + Cypress.env("userPoolId"))
    })

    after(() => {
      cy.exec(Cypress.env('deleteUserScript') + ' -e ' + Cypress.env('testUserEmail') + ' -U ' + Cypress.env("userPoolId") + ' -t ' + Cypress.env("listsTable"))
    })

    beforeEach(() => {
      cy.viewport('ipad-2')
      cy.login(Cypress.env('testUserEmail'), Cypress.env('testUserPassword'))
      cy.visit('/')
    })

    it('Should show sidebar', () => {
      cy.get('.MuiIconButton-root').click()
      cy.matchImageSnapshot('mobile-sidebar-authed');
    })
  })
})
