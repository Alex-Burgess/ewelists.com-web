const sizes = [
  'iphone-x',
  'ipad-2',
  ['ipad-2', 'landscape'],
  'macbook-13',
  [1920, 1080],
];

const pages = [
  'about',
  'contact',
  'cookies',
  'error',
  'landing',
  'list-ideas',
  'login',
  'privacy',
  'reset',
  'signup',
  'terms'
];

describe('Non Auth Page Visual Regression Tests', () => {
  sizes.forEach((size) => {
    pages.forEach((page) => {
      it(`Should match previous screenshot '${page} Page' When '${size}' resolution`, () => {
        cy.setCookie("CookieConsent", "true")

        if (Cypress._.isArray(size)) {
          cy.viewport(size[0], size[1])
        } else {
          cy.viewport(size)
        }

        if (page === 'landing' ) {
          cy.visit('/');
        } else {
            cy.visit(`/${page}`);
        }

        cy.get('header').invoke('css', 'position', 'relative');
        Cypress.config('defaultCommandTimeout', 50000);
        cy.matchImageSnapshot(`'${page}' - '${size}'`);
      });
    });
  });
});
