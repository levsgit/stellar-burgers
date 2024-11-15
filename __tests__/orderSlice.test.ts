import { initialState as OrdersState, getOrdersThunk, ordersSlice } from '../src/slices/orderSlice';
import { describe, expect, test } from '@jest/globals';

describe('Тесты редьюсера ordersSlice', () => {
  const initialState: typeof OrdersState = {
    orders: [],
    isLoading: true
  };

  const expectedOrders = [
    {
      _id: 'order123',
      ingredients: ['ingredient1', 'ingredient2'],
      status: 'done',
      name: 'Бургер с говядиной',
      createdAt: '2024-10-15T12:34:56.123Z',
      updatedAt: '2024-10-15T12:35:01.456Z',
      number: 1001
    },
    {
      _id: 'order124',
      ingredients: ['ingredient3', 'ingredient4'],
      status: 'pending',
      name: 'Чизбургер',
      createdAt: '2024-10-16T13:34:56.123Z',
      updatedAt: '2024-10-16T13:35:01.456Z',
      number: 1002
    }
  ];

  test('Начало загрузки заказов с сервера (pending)', () => {
    const ordersReducer = ordersSlice.reducer;
    const thunkAction = { type: getOrdersThunk.pending.type };

    const store = ordersReducer(initialState, thunkAction);

    expect(store.isLoading).toBe(true);
    expect(store.orders).toEqual([]);
  });

  test('Успешная загрузка заказов с сервера (fulfilled)', () => {
    const ordersReducer = ordersSlice.reducer;
    const thunkAction = {
      type: getOrdersThunk.fulfilled.type,
      payload: expectedOrders
    };

    const store = ordersReducer(initialState, thunkAction);

    expect(store.isLoading).toBe(false);
    expect(store.orders).toEqual(expectedOrders);
  });

  test('Ошибка загрузки заказов с сервера (rejected)', () => {
    const ordersReducer = ordersSlice.reducer;
    const thunkAction = { type: getOrdersThunk.rejected.type };

    const store = ordersReducer(initialState, thunkAction);

    expect(store.isLoading).toBe(false);
    expect(store.orders).toEqual([]);
  });
});
