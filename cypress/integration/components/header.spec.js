import TestFilter from '../../support/TestFilter';

TestFilter(['smoke', 'regression'], () => {
  describe('Header Link Tests For Public Pages', () => {
    beforeEach(() => {
      cy.setCookie("CookieConsent", "true")
    })

    it('Should have correct white header links on desktop', () => {
      // White header is used on list ideas page
      cy.visit('/contact')
      cy.get('[data-cy=header-logo-blue]')
      cy.get('[data-cy=header-link-logo]').should('have.attr', 'href', '/')
      cy.get('[data-cy=header-link-ideas]').should('have.attr', 'href', '/list-ideas')
      cy.get('[data-cy=header-link-login]').should('have.attr', 'href', '/login')
      cy.get('[data-cy=header-link-signup]').should('have.attr', 'href', '/signup')

      // Mobile button should be hidden
      cy.get('#header-mobile-sidebar-button').should('not.exist')
    })

    it('Should have correct white header links on mobile', () => {
      cy.viewport('ipad-2')

      // White header is used on list ideas page
      cy.visit('/contact')
      cy.get('[data-cy=header-logo-blue]')
      cy.get('[data-cy=header-link-logo]').should('have.attr', 'href', '/')

      // Header should have mobile button, but sidebar should not be open.
      cy.get('#header-mobile-sidebar-button').should('have.css', 'visibility', 'visible')
      cy.get('#header-mobile-sidebar').should('not.exist')

      // If you click the button sidebar should be visible
      cy.get('#header-mobile-sidebar-button').click()
      cy.get('#header-mobile-sidebar').should('have.css', 'visibility', 'visible')

      // Sidebar links should exist
      cy.get('[data-cy=sidebar-link-ideas]').should('have.attr', 'href', '/list-ideas')
      cy.get('[data-cy=sidebar-link-login]').should('have.attr', 'href', '/login')
      cy.get('[data-cy=sidebar-link-signup]').should('have.attr', 'href', '/signup')
    })

    it('Should have correct transparent header links on desktop', () => {
      // Transparent header is used on list ideas page
      cy.visit('/list-ideas')
      cy.get('[data-cy=header-logo-white]')
      cy.get('[data-cy=header-link-logo]').should('have.attr', 'href', '/')
      cy.get('[data-cy=header-link-ideas]').should('have.attr', 'href', '/list-ideas')
      cy.get('[data-cy=header-link-login]').should('have.attr', 'href', '/login')
      cy.get('[data-cy=header-link-signup]').should('have.attr', 'href', '/signup')

      // Mobile button should be hidden
      cy.get('#header-mobile-sidebar-button').should('not.exist')
    })

    it('Should have correct transparent header links on mobile', () => {
      cy.viewport('ipad-2')

      // White header is used on list ideas page
      cy.visit('/list-ideas')
      cy.get('[data-cy=header-logo-white]')
      cy.get('[data-cy=header-link-logo]').should('have.attr', 'href', '/')

      // Header should have mobile button, but sidebar should not be open.
      cy.get('#header-mobile-sidebar-button').should('have.css', 'visibility', 'visible')
      cy.get('#header-mobile-sidebar').should('not.exist')

      // If you click the button sidebar should be visible
      cy.get('#header-mobile-sidebar-button').click()
      cy.get('#header-mobile-sidebar').should('have.css', 'visibility', 'visible')

      // Sidebar links should exist
      cy.get('[data-cy=sidebar-link-ideas]').should('have.attr', 'href', '/list-ideas')
      cy.get('[data-cy=sidebar-link-login]').should('have.attr', 'href', '/login')
      cy.get('[data-cy=sidebar-link-signup]').should('have.attr', 'href', '/signup')
    })
  })

  describe('Header Link Tests For Authed Views', () => {
    // Note: We don't test white and transparent header bars in auth view, as this is effectively covered.
    // But for completeness we could add them in the future.

    const userEmail = "eweuser8+header-links@gmail.com"
    const userName = 'Test Header'

    before(() => {
      cy.exec(Cypress.env('createUserScript') + ' -e ' + userEmail + ' -n "' + userName + '" -U ' + Cypress.env("userPoolId"))
    })

    after(() => {
      cy.exec(Cypress.env('deleteUserScript') + ' -e ' + userEmail + ' -U ' + Cypress.env("userPoolId") + ' -t ' + Cypress.env("listsTable"))
    })

    beforeEach(() => {
      cy.setCookie("CookieConsent", "true")
      cy.login(userEmail, Cypress.env('testUserPassword'))
      cy.visit('/')
    })

    it('Should have correct dark header links on desktop', () => {
      // Dark header is used on dashboard page, so need to authenticate
      cy.get('[data-cy=header-logo-white]')
      cy.get('[data-cy=header-link-logo]').should('have.attr', 'href', '/')
      cy.get('[data-cy=header-link-your-lists]').should('have.attr', 'href', '/')
      cy.get('[data-cy=header-link-ideas]').should('have.attr', 'href', '/list-ideas')
      cy.get('[data-cy=header-link-profile-dropdown]').click()
      cy.get('[data-cy=header-link-user-account]').should('have.attr', 'href', '/')
      cy.get('[data-cy=header-link-logout]').should('have.attr', 'href', '/logout')

      // Mobile button should be hidden
      cy.get('#header-mobile-sidebar-button').should('not.exist')
    })

    it('Should have correct dark header links on mobile', () => {
      cy.viewport('ipad-2')

      // White header is used on dashboard
      cy.visit('/')
      cy.get('[data-cy=header-logo-white]')
      cy.get('[data-cy=header-link-logo]').should('have.attr', 'href', '/')

      // Header should have mobile button, but sidebar should not be open.
      cy.get('#header-mobile-sidebar-button').should('have.css', 'visibility', 'visible')
      cy.get('#header-mobile-sidebar').should('not.exist')

      // If you click the button sidebar should be visible
      cy.get('#header-mobile-sidebar-button').click()
      cy.get('#header-mobile-sidebar').should('have.css', 'visibility', 'visible')

      // Sidebar links should exist
      cy.get('[data-cy=sidebar-link-your-lists]').should('have.attr', 'href', '/')
      cy.get('[data-cy=sidebar-link-ideas]').should('have.attr', 'href', '/list-ideas')
      cy.get('[data-cy=sidebar-link-account]').should('have.attr', 'href', '/')
      cy.get('[data-cy=sidebar-link-logout]').should('have.attr', 'href', '/logout')
    })
  })
})


TestFilter(['regression'], () => {
  describe('Header Visual Snapshot Tests For Public Pages', () => {
    beforeEach(() => {
      cy.setCookie("CookieConsent", "true")

    })

    it('Should have correct snapshot for white header', () => {
      cy.visit('/contact')
      cy.get('[data-cy=header]').matchImageSnapshot('header-white-desktop');

      cy.viewport('ipad-2')
      cy.get('[data-cy=header]').matchImageSnapshot('header-white-mobile');
    })

    it('Should have correct snapshot for transparent header', () => {
      cy.visit('/list-ideas')
      cy.get('[data-cy=header]').matchImageSnapshot('header-transparent-desktop');

      cy.viewport('ipad-2')
      cy.get('[data-cy=header]').matchImageSnapshot('header-transparent-mobile');
    })

    it('Should have correct snapshot for sidebar', () => {
      cy.viewport('ipad-2')
      cy.visit('/contact')
      cy.get('#header-mobile-sidebar-button').click()
      cy.get('#header-mobile-sidebar').matchImageSnapshot('mobile-sidebar-non-authed');
    })

    it('Should change css styles with hover (desktop)', () => {
      cy.task('resetCRI').visit('/contact')
      cy.get('[data-cy=header-link-login]').should('have.css', "background-color", "rgba(0, 0, 0, 0)")
      cy.task('activateHoverPseudo', { selector: '[data-cy=header-link-login]' })
      cy.get('[data-cy=header-link-login]').should('have.css', "background-color", "rgba(87, 117, 144, 0.15)")
      cy.get('[data-cy=header]').matchImageSnapshot('header-desktop-nonauthed-link-hover');
    })

    // Doesn't work because there are two sidebar-link-login elements and can't specify which one.
    // Not essential because on hover is not a thing for mobile devices.
    it.skip('Should change css styles with hover (mobile)', () => {
      cy.viewport('ipad-2')
      cy.task('resetCRI').visit('/contact')
      cy.get('#header-mobile-sidebar-button').click()

      cy.get('#header-mobile-sidebar').find('[data-cy=sidebar-link-login]').should('have.css', "background-color", "rgba(0, 0, 0, 0)")
      cy.task('activateHoverPseudo', { selector: '[data-cy=sidebar-link-login]' })
      cy.get('[data-cy=sidebar-link-login]').eq(1).should('have.css', "background-color", "rgba(87, 117, 144, 0.15)")
      cy.get('#header-mobile-sidebar').matchImageSnapshot('header-mobile-nonauthed-link-hover');
    })
  })

  describe('Header Visual Snapshot Tests For Authed Pages', () => {
    const userEmail = "eweuser8+header-snapshot@gmail.com"
    const userName = 'Test Header'

    before(() => {
      cy.exec(Cypress.env('createUserScript') + ' -e ' + userEmail + ' -n "' + userName + '" -U ' + Cypress.env("userPoolId"))
    })

    after(() => {
      cy.exec(Cypress.env('deleteUserScript') + ' -e ' + userEmail + ' -U ' + Cypress.env("userPoolId") + ' -t ' + Cypress.env("listsTable"))
    })

    beforeEach(() => {
      cy.setCookie("CookieConsent", "true")
      cy.login(userEmail, Cypress.env('testUserPassword'))
    })

    it('Should have correct snapshot for dark header', () => {
      cy.visit('/')
      cy.get('[data-cy=header]').matchImageSnapshot('header-dark-desktop');

      cy.viewport('ipad-2')
      cy.get('[data-cy=header]').matchImageSnapshot('header-dark-mobile');
    })

    it('Should have correct snapshot for sidebar', () => {
      cy.viewport('ipad-2')
      cy.visit('/')
      cy.get('#header-mobile-sidebar-button').click()
      cy.get('#header-mobile-sidebar').matchImageSnapshot('mobile-sidebar-authed');
    })

    it('Should change css styles with hover (desktop)', () => {
      cy.task('resetCRI').visit('/')
      cy.get('[data-cy=header-link-your-lists]').should('have.css', "background-color", "rgba(0, 0, 0, 0)")
      cy.task('activateHoverPseudo', { selector: '[data-cy=header-link-your-lists]' })
      cy.get('[data-cy=header-link-your-lists]').should('have.css', "background-color", "rgba(255, 255, 255, 0.1)")
      cy.get('[data-cy=header]').matchImageSnapshot('header-desktop-authed-link-hover');
    })

    // Doesn't work because there are two sidebar-link-login elements and can't specify which one.
    // Not essential because on hover is not a thing for mobile devices.
    it.skip('Should change css styles with hover (mobile)', () => {
    })

    it('Should have correct snapshot for user profile dropdown', () => {
      cy.visit('/')
      cy.get('[data-cy=header-link-profile-dropdown]').click()
      cy.task('activateHoverPseudo', { selector: '.dropdownItem' })
      cy.matchImageSnapshot('desktop-authed-dropdown');
    })
  })
})
