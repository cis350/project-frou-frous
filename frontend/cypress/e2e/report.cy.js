describe('report', () => {
  it('should submit a valid report', () => {
    cy.viewport(1280, 1200);
    cy.visit('http://localhost:3000/');
    cy.get('input[name="username"]').type('jess');
    cy.get('input[name="password"]').type('jess');
    cy.get('button[type="submit"]').click();
    cy.get('a[href*="/app/report"]').click();
    cy.get('input[placeholder="Reportee"]').type('Erik');
    cy.get('textarea[placeholder="Caption"]').type('E2E Erik Skip');
    cy.get('input[type=file]').selectFile('cypress/fixtures/cat.jpeg');
    cy.get('button[name="post"]').click();
    cy.get('textarea[placeholder="Caption"]').should('have.value', '');
  });
});
