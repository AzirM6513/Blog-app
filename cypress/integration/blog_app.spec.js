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
});
