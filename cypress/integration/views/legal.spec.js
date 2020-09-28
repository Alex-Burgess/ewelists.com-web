import TestFilter from '../../support/TestFilter';

const pages = [
  'cookies',
  'privacy',
  'terms'
];


TestFilter(['regression'], () => {
  describe('Visual Snapshot Tests', () => {
    const sizes = Cypress.env("snapshotSizes");

    beforeEach(() => {
      cy.setCookie("CookieConsent", "true")
    })

    pages.forEach((page) => {
      sizes.forEach((size) => {
        it(`Should match previous screenshot when ${size} resolution`, () => {
          cy.setCookie("CookieConsent", "true")

          if (Cypress._.isArray(size)) {
            cy.viewport(size[0], size[1])
          } else {
            cy.viewport(size)
          }

          cy.visit(`/${page}`)

          cy.get('header').invoke('css', 'position', 'relative')
          Cypress.config('defaultCommandTimeout', 50000)
          cy.matchImageSnapshot(`${page}-${size}`)
        })
      })
    })
  })
})
