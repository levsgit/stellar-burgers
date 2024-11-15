import { initialState, getInridientsThunk, ingridientsSlice } from '../src/slices/ingredientsSlice';
import { describe, expect, test } from '@jest/globals';

describe('Тесты редьюсера ingridientsSlice', () => {
  const expectedResult = [
    {
      _id: '1',
      name: 'Булочка с кунжутом',
      type: 'bun',
      price: 100,
      image: 'bun-image-url',
      image_mobile: 'bun-image-mobile-url',
      image_large: 'bun-image-large-url'
    },
    {
      _id: '2',
      name: 'Котлета из говядины',
      type: 'main',
      price: 200,
      image: 'meat-image-url',
      image_mobile: 'meat-image-mobile-url',
      image_large: 'meat-image-large-url'
    }
  ];

  test('Начало загрузки ингредиентов с сервера (pending)', () => {
    const ingredientsReducer = ingridientsSlice.reducer;
    const thunkAction = { type: getInridientsThunk.pending.type };

    const store = ingredientsReducer(initialState, thunkAction);

    expect(store.isLoading).toBe(true);
    expect(store.error).toBeNull();
  });

  test('Успешная загрузка ингредиентов с сервера (fulfilled)', () => {
    const ingredientsReducer = ingridientsSlice.reducer;
    const thunkAction = {
      type: getInridientsThunk.fulfilled.type,
      payload: expectedResult
    };

    const store = ingredientsReducer(initialState, thunkAction);

    expect(store.ingredients).toEqual(expectedResult);
    expect(store.isLoading).toBe(false);
    expect(store.error).toBeNull();
  });

  test('Ошибка загрузки ингредиентов с сервера (rejected)', () => {
    const ingredientsReducer = ingridientsSlice.reducer;
    const thunkAction = {
      type: getInridientsThunk.rejected.type,
      error: { message: 'Ошибка загрузки ингредиентов' }
    };

    const store = ingredientsReducer(initialState, thunkAction);

    expect(store.ingredients).toEqual([]);
    expect(store.isLoading).toBe(false);
    expect(store.error).toEqual('Ошибка загрузки ингредиентов');
  });
});
