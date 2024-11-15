describe('Проверка работы модальных окон', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000/');
  });

  it('Открытие модалки игредиента', () => {
    cy.contains('Детали ингредиента').should('not.exist');

    cy.get('h3')
      .contains('Начинки')
      .next('ul').contains('Библиокотлета из марсианской Магнолии').click();


    cy.contains('Детали ингредиента').should('exist');

    const modal = cy.get('[data-cy=modal]');
    modal.contains('Библиокотлета из марсианской Магнолии').should('exist');
  });

  it('Закрытие модалки через крест', () => {
    cy.get('h3')
      .contains('Начинки')
      .next('ul').contains('Библиокотлета из марсианской Магнолии').click();

    cy.contains('Детали ингредиента').should('exist');

    const modalCloseButton = cy.get('[data-cy=modal-close-button]');
    modalCloseButton.click();

    const modal = cy.get('[data-cy=modal]');
    modal.should('not.exist');
  });

  it('Закрытие модалки нажатием на оверлей', () => {
    cy.get('h3')
      .contains('Начинки')
      .next('ul').contains('Библиокотлета из марсианской Магнолии').click();

    cy.contains('Детали ингредиента').should('exist');

    const modalOverlay = cy.get('[data-cy=modal-overlay]');
    modalOverlay.click('right', { force: true });

    const modal = cy.get('[data-cy=modal]');
    modal.should('not.exist');
  });
});