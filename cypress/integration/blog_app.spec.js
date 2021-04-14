describe('Blog app', function () {
  beforeEach(function () {
    const user = {
      username: 'christian',
      password: 'cypress testing',
    };

    cy.createUser(user.username, user.password);
    cy.request('POST', 'http://localhost:3003/api/login', user);

    cy.visit('http://localhost:3003');
  });
});
