describe('register', () => {
  it('registers', () => {
    cy.visit('http://localhost:3001/register');
    const firstName = 'John3';
    const lastName = 'Doe3';
    const email = 'johndoe@example.com';
    const username = 'johndoe3';
    const password = 'password3';

    cy.get('input[name="firstName"]').type(firstName);
    cy.get('input[name="lastName"]').type(lastName);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="username1"]').type(username);
    cy.get('input[name="password1"]').type(password);
    cy.get('button[data-testid="submitButton"]').click();
  });
  it('should log in a user with valid credentials', () => {
    cy.visit('http://localhost:3001/');
    cy.get('input[name="username"]').type('jess');
    cy.get('input[name="password"]').type('jess');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/jess');
  });

  it('should display an error message with invalid credentials', () => {
    cy.visit('http://localhost:3001/');
    cy.get('input[name="username"]').type('jess');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
  });
});
