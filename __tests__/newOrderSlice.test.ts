import { initialState, newOrderThunk, newOrderSlice } from '../src/slices/newOrderSlice';
import { describe, expect, test } from '@jest/globals';

describe('Тесты редьюсера newOrderSlice', () => {
  const expectedOrder = {
    _id: 'order123',
    ingredients: ['ingredient1', 'ingredient2'],
    status: 'pending',
    name: 'Бургер с говядиной',
    createdAt: '2024-10-15T12:34:56.123Z',
    updatedAt: '2024-10-15T12:35:01.456Z',
    number: 1001
  };

  test('Начало создания нового заказа (pending)', () => {
    const newOrderReducer = newOrderSlice.reducer;
    const thunkAction = { type: newOrderThunk.pending.type };

    const store = newOrderReducer(initialState, thunkAction);

    expect(store.request).toBe(true);
    expect(store.error).toBeNull();
    expect(store.orderData).toBeNull();
  });

  test('Успешное создание нового заказа (fulfilled)', () => {
    const newOrderReducer = newOrderSlice.reducer;
    const thunkAction = {
      type: newOrderThunk.fulfilled.type,
      payload: { order: expectedOrder }
    };

    const store = newOrderReducer(initialState, thunkAction);

    expect(store.request).toBe(false);
    expect(store.orderData).toEqual(expectedOrder);
    expect(store.error).toBeNull();
  });

  test('Ошибка при создании нового заказа (rejected)', () => {
    const newOrderReducer = newOrderSlice.reducer;
    const thunkAction = {
      type: newOrderThunk.rejected.type,
      error: { message: 'Ошибка при создании заказа' }
    };

    const store = newOrderReducer(initialState, thunkAction);

    expect(store.request).toBe(false);
    expect(store.orderData).toBeNull();
    expect(store.error).toEqual('Ошибка при создании заказа');
  });

  test('Сброс состояния заказа (resetOrder)', () => {
    const newOrderReducer = newOrderSlice.reducer;
    const action = { type: newOrderSlice.actions.resetOrder.type };

    const store = newOrderReducer(initialState, action);

    expect(store).toEqual(initialState);
  });
});
