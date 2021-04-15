describe('blog app', function () {
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

  describe('when logged in', function () {
    beforeEach(function () {
      cy.get('input:first').type('christian');
      cy.get('input:last').type('cypress testing');
      cy.get('button').contains('login').click();
    });

    it('blog can be created', function () {
      cy.get('.toggle-btn').contains('create new blog').click();

      cy.get('#title-input').type('cypress test');
      cy.get('#author-input').type('cypress');
      cy.get('#url-input').type('cypress.testing.dev');
      cy.get('#submit-blog-btn').click();

      cy.contains('cypress test cypress');
    });

    // FixMe: refactor to create dry code
    // describe('buttons', function () {
    //   it('like button increases likes by one', function () {
    //     cy.get('.toggle-details').click();

    //     cy.get('togglableContent').contains('likes 0');

    //     cy.get('.togglableContent')
    //       .parent()
    //       .find('button')
    //       .contains('like')
    //       .click();

    //     cy.get('.togglableContent').contains('likes 1');
    //   });
    // });

    it('when blog likes button clicked likes increases by one', function () {
      cy.get('.toggle-btn').contains('create new blog').click();

      cy.get('#title-input').type('cypress test');
      cy.get('#author-input').type('cypress');
      cy.get('#url-input').type('cypress.testing.dev');
      cy.get('#submit-blog-btn').click();

      cy.get('.toggle-details').click();
      cy.get('.togglableContent')
        .parent()
        .find('button')
        .contains('like')
        .click();

      cy.get('.togglableContent').contains('likes 1');
    });

    it('when delete button clicked blog is deleted from page and server', function () {
      cy.get('.toggle-btn').contains('create new blog').click();

      cy.get('#title-input').type('cypress test delete');
      cy.get('#author-input').type('cypress');
      cy.get('#url-input').type('cypress.io');
      cy.get('#submit-blog-btn').click();

      cy.contains('cypress test delete cypress');

      cy.get('.toggle-details').click();
      cy.get('.togglableContent').parent().find('.del-btn').click();

      cy.get('html').should('not.contain', 'cypress test delete cypress');
      cy.get('.message')
        .should(
          'contain',
          // eslint-disable-next-line quotes
          "blog 'cypress test delete' was removed"
        )
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid');
    });
  });
});
