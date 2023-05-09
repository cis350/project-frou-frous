describe('template spec', () => {
  it('should submit a valid class', () => {
    cy.viewport(1280, 1200);
    cy.visit('http://localhost:3000/');
    cy.get('input[name="username"]').type('jess');
    cy.get('input[name="password"]').type('jess');
    cy.get('button[type="submit"]').click();
    cy.get('a[href*="/app/schedule/1234"]').click();
    cy.get('button[title="open"]').click();
    cy.get('input[placeholder="Course Title"]').type('Test Class');
    cy.get('input[placeholder="Course Location"]').type('Fagin Hall');
    cy.get('input[title="start"]').type('12:00');
    cy.get('input[title="end"]').type('13:00');
    cy.get('input[id="m"]').click();
    cy.get('input[id="th"]').click();
    cy.get('button[title="submit"]').click();
    cy.get('div').contains('Test Class').should('be.visible');
  });
})