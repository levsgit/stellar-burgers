describe('Тест конструктора бургера', () => {

  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.viewport(1300, 800);
    cy.visit('/');
  });

  it('булка добавляется в конструктор', () => {
    cy.get('h3')
      .contains('Булки')
      .parent()
      .find('button.common_button')
      .first()
      .click();

    const topBun = cy.get('[data-cy=top-bun]');
    const bottomBun = cy.get('[data-cy=bottom-bun]');

    topBun.contains('Кротовая булка N-200i').should('exist');
    bottomBun.contains('Кротовая булка N-200i').should('exist');
  });

  it('игредиенты добавляются в конструктор', () => {
    cy.get('h3')
      .contains('Начинки')
      .next('ul')
      .find('button.common_button')
      .first()
      .click();

    cy.get('[data-cy=ingredients]')
      .contains('Библиокотлета из марсианской Магнолии')
      .should('exist');
  });
});