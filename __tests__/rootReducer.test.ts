import { describe, expect, test } from '@jest/globals';

import { initialState as userState } from '../src/slices/userSlice';
import { initialState as ingredientsState } from '../src/slices/ingredientsSlice';
import { initialState as orderState } from '../src/slices/orderSlice';
import { initialState as newOrderState } from '../src/slices/newOrderSlice';
import { initialState as FeedState } from '../src/slices/feedSlice';
import { initialState as ConstructorState } from '../src/slices/burgerConstructor';
import { rootReducer } from '../src/rootReducer';

describe('тест работы rootReducer', () => {
  const expectedResult = {
    user: userState,
    ingredients: ingredientsState,
    orders: orderState,
    newOrder: newOrderState,
    feeds: FeedState,
    burgerConstructor: ConstructorState,
  };

  test('поведение редьюсера при unknown action', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const store = rootReducer(undefined, action);

    expect(store).toEqual(expectedResult);
  });
});
