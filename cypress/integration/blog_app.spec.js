describe('Blog app', function () {
  beforeEach(function () {
    const user = {
      username: 'christian',
      password: 'cypress testing',
      name: 'Christian Ortiz',
    };

    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.request('POST', 'http://localhost:3003/api/users', user);

    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', function () {
    cy.contains('login to application');
    cy.contains('username');
    cy.contains('password');
    cy.get('button').contains('login');
  });

  describe('login', function () {
    it('succeeds with correct information', function () {
      cy.get('input:first').type('christian');
      cy.get('input:last').type('cypress testing');
      cy.get('button').contains('login').click();

      cy.contains('Christian Ortiz logged-in');
    });

    it('fails with wrong credentials', function () {
      cy.get('input:first').type('username');
      cy.get('input:last').type('password');
      cy.get('button').contains('login').click();

      cy.get('.message')
        .should('contain', 'Wrong Username or Password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid');

      cy.get('html').should('not.contain', 'Christian Ortiz logged-in');
    });
  });
});
