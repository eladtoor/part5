describe('Blog app', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Elad',
      username: 'testuser',
      password: '123',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.visit('http://localhost:3000');
    cy.contains('Log in to application');
    cy.get('#username');
    cy.get('#password').should('contain', '');
    cy.get('#login-button').should('contain', 'login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('testuser');
      cy.get('#password').type('123');
      cy.get('#login-button').click();
      cy.contains('Elad logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('testuser');
      cy.get('#password').type('1235');
      cy.get('#login-button').click();
      cy.contains('wrong username or password');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('testuser');
      cy.get('#password').type('123');
      cy.get('#login-button').click();

      cy.get('#new-blog').click();
      cy.get('#new-blog-title').type('test title');
      cy.get('#new-blog-author').type('test author');
      cy.get('#new-blog-url').type('test url');
      cy.get('#new-blog-create-btn').click();
    });

    it('A blog can be created', function () {
      cy.get('.blog-title-author').contains('test title test author');
      cy.get('#view-button').contains('view');
    });
    it('A like can be clicked', function () {
      cy.get('.blog-title-author').contains('test title test author');
      cy.get('#view-button').click();
      cy.get('#likes-button').click();
      cy.get('#likes-details').contains('likes 1');
    });

    it('A blog can be removed by user', function () {
      cy.get('#view-button').click();
      cy.get('#remove-button').click();
      cy.get('#view-button').should('not.exist');
    });

    it('A blog cannot be removed by foreign user', function () {
      cy.get('#logout-button').click();

      const user = {
        name: 'Elad',
        username: 'newtestuser',
        password: '123',
      };
      cy.request('POST', 'http://localhost:3003/api/users/', user);

      cy.get('#username').type('newtestuser');
      cy.get('#password').type('123');
      cy.get('#login-button').click();

      cy.get('#view-button').click();
      cy.get('#remove-button').should('have.css', 'display', 'none');
    });
  });
});

