import { initialState as FeedsState, getFeedsThunk, feedsSlice } from '../src/slices/feedSlice';
import { describe, expect, test } from '@jest/globals';

describe('Тесты редьюсера feedSlice', () => {
  const initialState: typeof FeedsState = {
    orders: [],
    total: 0,
    totalToday: 0,
    isLoading: true,
    error: undefined
  };

  const expectedResult = {
    orders: [
      {
        _id: '77da84ff229d46002b60319d',
        ingredients: [
          '753d69b5d4f8c9002dfa194e',
          '753d69b5d4f8c9002dfa1945',
          '753d69b5d4f8c9002dfa194e'
        ],
        status: 'done',
        name: 'Лунный экзотический бургер',
        createdAt: '2024-10-15T12:34:56.123Z',
        updatedAt: '2024-10-15T12:35:01.456Z',
        number: 62001
      },
      {
        _id: '77da98aa229d46002b6031af',
        ingredients: [
          '753d69b5d4f8c9002dfa194c',
          '753d69b5d4f8c9002dfa194f',
          '753d69b5d4f8c9002dfa1952',
          '753d69b5d4f8c9002dfa194c'
        ],
        status: 'pending',
        name: 'Марсианский тропический бургер',
        createdAt: '2024-10-15T11:22:33.789Z',
        updatedAt: '2024-10-15T11:22:38.987Z',
        number: 61999
      }
    ],
    total: 60000,
    totalToday: 125
  };  

  test('Начало загрузки ленты заказов с сервера (pending)', () => {
    const ordersFeedReducer = feedsSlice.reducer;
    const thunkAction = { type: getFeedsThunk.pending.type };

    const store = ordersFeedReducer(initialState, thunkAction);

    expect(store.isLoading).toBe(true);
    expect(store.error).toBeUndefined();
  });

  test('Успешная загрузка ленты заказов с сервера (fulfilled)', () => {
    const ordersFeedReducer = feedsSlice.reducer;
    const thunkAction = {
      type: getFeedsThunk.fulfilled.type,
      payload: expectedResult
    };

    const store = ordersFeedReducer(initialState, thunkAction);

    expect(store.orders).toEqual(expectedResult.orders);
    expect(store.total).toEqual(expectedResult.total);
    expect(store.totalToday).toEqual(expectedResult.totalToday);
    expect(store.isLoading).toBe(false);
    expect(store.error).toBeUndefined();
  });

  test('Ошибка загрузки ленты заказов с сервера (rejected)', () => {
    const ordersFeedReducer = feedsSlice.reducer;
    const thunkAction = {
      type: getFeedsThunk.rejected.type,
      error: { message: 'Ошибка загрузки заказов' }
    };

    const store = ordersFeedReducer(initialState, thunkAction);

    expect(store.orders).toEqual([]);
    expect(store.total).toBe(0);
    expect(store.totalToday).toBe(0);
    expect(store.error).toEqual('Ошибка загрузки заказов');
    expect(store.isLoading).toBe(false);
  });
});
