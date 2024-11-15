import { describe, expect, test } from '@jest/globals';
import {
  burgerConstructorSlice,
  addItem,
  deleteItem,
  updateAll,
} from '../src/slices/burgerConstructor';
import { TConstructorIngredient } from '../src/utils/types'

const { reducer } = burgerConstructorSlice;

describe('Тесты редьюсера burgerConstructorSlice', () => {
  const initialState = {
    bun: null,
    ingredients: [],
  };

  const ingredient1 = {
    _id: '643d69a5c3f7b9001cfa093d',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
    id: '2cbd6338-56h7-1234-abd4-c9678c890be2',
  };

  const ingredient2 = {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    id: '2cbd6338-6f0f-4b62-abd4-c9678c890be2',
  };

  const ingredient3 = {
    _id: '4ae963eb-e7b7-4da9-a7c8-6cb75587d6d0',
    name: 'Котлета из острого перца',
    type: 'sauce',
    proteins: 13,
    fat: 29,
    carbohydrates: 46,
    calories: 2847,
    price: 499,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    id: '52a15713-b43b-47e7-9009-729bb4b72100'
  };

  const excludeId = ({ id, ...rest }: TConstructorIngredient) => rest;

  test('добавить булку в конструктор', () => {
    const newState = reducer(initialState, addItem(ingredient1));

    expect(excludeId(newState.bun)).toEqual(excludeId(ingredient1));
    expect(newState.ingredients).toHaveLength(0);
  });

  test('добавить ингредиент в конструктор', () => {
    const newState = reducer(initialState, addItem(ingredient2));

    expect(newState.ingredients).toHaveLength(1);
    expect(excludeId(newState.ingredients[0])).toEqual(excludeId(ingredient2));
  });

  test('удалить ингредиент из конструктора', () => {
    let newState = reducer(initialState, addItem(ingredient1));
    newState = reducer(newState, addItem(ingredient2));

    const addedIngridientId = newState.ingredients[0].id;

    const initialLength = newState.ingredients.length;
    newState = reducer(newState, deleteItem({ id: addedIngridientId }));

    expect(newState.ingredients).toHaveLength(initialLength - 1);
    expect(newState.ingredients).not.toContainEqual(ingredient2);
  });

  test('перемещение ингредиентов в заказе', () => {
    // Инициализация начального состояния
    let newState = reducer(initialState, addItem(ingredient1));
    newState = reducer(newState, addItem(ingredient2));
    newState = reducer(newState, addItem(ingredient3));
  
    // Проверка начального порядка
    expect(excludeId(newState.bun)).toEqual(excludeId(ingredient1)); // ingredient1 должен быть первым (bun)
    expect(excludeId(newState.ingredients[0])).toEqual(excludeId(ingredient2)); // ingredient2 второй
    expect(excludeId(newState.ingredients[1])).toEqual(excludeId(ingredient3)); // ingredient3 третий
  
    const newOrderOfIngridients: TConstructorIngredient[] = [ingredient3, ingredient2];
    newState = reducer(newState, updateAll(newOrderOfIngridients));
  
    expect(excludeId(newState.bun)).toEqual(excludeId(ingredient1)); // ingredient1 все еще на первом месте
    expect(excludeId(newState.ingredients[0])).toEqual(excludeId(ingredient3)); // ingredient3 должен быть на втором месте после перемещения
    expect(excludeId(newState.ingredients[1])).toEqual(excludeId(ingredient2)); // ingredient2 должен быть на третьем месте
  });
});
