const sizes = [
  'iphone-x',
  'ipad-2',
  ['ipad-2', 'landscape'],
  'macbook-13',
  [1920, 1080],
];

const pages = [
  'dashboard',
];

describe('Auth Page Visual Regression tests', () => {
  const email = "eweuser8+authpages@gmail.com"

  before(() => {
    cy.exec('python ' + Cypress.config().createUserScript + ' -e ' + email + ' -n "Cypress TestDashboard"')
    cy.login(email, 'P4ssw0rd!')
  })

  after(() => {
    cy.exec('python ' + Cypress.config().deleteUserScript + ' -e ' + email)
  })

  sizes.forEach((size) => {
    pages.forEach((page) => {
      it(`Should match previous screenshot '${page} Page' When '${size}' resolution`, () => {
        cy.setCookie("CookieConsent", "true")

        if (Cypress._.isArray(size)) {
          cy.viewport(size[0], size[1])
        } else {
          cy.viewport(size)
        }

        if (page === 'dashboard' ) {
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
