describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Christian Ortiz',
      username: 'christian',
      password: 'cypress testing',
    };

    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('http://localhost:3003');
  });
});
