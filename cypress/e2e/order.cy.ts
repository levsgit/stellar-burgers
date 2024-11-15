describe('Тестирование функции оформления заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
    cy.viewport(1300, 800);

    window.localStorage.setItem('refreshToken', 'test');
    cy.setCookie('accessToken', JSON.stringify('test'));

    cy.visit('/');
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('оформление заказа', () => {
    cy.get('h3')
      .contains('Булки')
      .next('ul')
      .find('button.common_button')
      .first()
      .click();

    cy.get('h3')
      .contains('Начинки')
      .next('ul')
      .find('button.common_button')
      .first()
      .click();

    const orderButton = cy.get('[data-cy=order-button]');
    orderButton.contains('Оформить заказ').click();

    const modal = cy.get('[data-cy=modal]');
    modal.should('exist');

    const orderNumber = cy.get('[data-cy=order-number]');
    orderNumber.contains('666').should('exist');

    const modalCloseButton = cy.get('[data-cy=modal-close-button]');
    modalCloseButton.click();
    modal.should('not.exist');

    cy.get('[data-cy=empty-top-bun]').should('exist');
    cy.get('[data-cy=empty-bottom-bun]').should('exist');
    cy.get('[data-cy=empty-ingredients]').should('exist');
  });
});