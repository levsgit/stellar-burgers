import { initialState as UserState, getUserThunk, loginUserThunk, logoutUserThunk, registrationUserThunk, updateUserThunk, userSlice } from '../src/slices/userSlice';
import { describe, expect, test } from '@jest/globals';

describe('Тесты редьюсера userSlice', () => {
  const initialState: typeof UserState = {
    isInit: false,
    isLoading: false,
    user: {
      email: '',
      name: ''
    },
    error: ''
  };

  const userData = {
    email:"aloisovich@yandex.ru",
    name:"Адольф"
  };

  test('Получение данных о пользователе (getUserThunk.pending)', () => {
    const userReducer = userSlice.reducer;
    const thunkAction = { type: getUserThunk.pending.type };

    const store = userReducer(initialState, thunkAction);

    expect(store.isLoading).toBe(true);
    expect(store.isInit).toBe(false);
    expect(store.user).toEqual({ email: '', name: '' });
  });

  test('Ошибка при получении данных о пользователе (getUserThunk.rejected)', () => {
    const userReducer = userSlice.reducer;
    const thunkAction = { type: getUserThunk.rejected.type, error: { message: 'Ошибка' } };

    const store = userReducer(initialState, thunkAction);

    expect(store.isLoading).toBe(false);
    expect(store.isInit).toBe(false);
    expect(store.error).toBe('Ошибка');
  });

  test('Успешное получение данных о пользователе (getUserThunk.fulfilled)', () => {
    const userReducer = userSlice.reducer;
    const thunkAction = { type: getUserThunk.fulfilled.type, payload: { user: userData } };

    const store = userReducer(initialState, thunkAction);

    expect(store.isLoading).toBe(false);
    expect(store.isInit).toBe(true);
    expect(store.user).toEqual(userData);
  });

  test('Регистрация пользователя (registrationUserThunk.pending)', () => {
    const userReducer = userSlice.reducer;
    const thunkAction = { type: registrationUserThunk.pending.type };

    const store = userReducer(initialState, thunkAction);

    expect(store.isLoading).toBe(true);
    expect(store.user).toEqual({ email: '', name: '' });
  });

  test('Ошибка при регистрации пользователя (registrationUserThunk.rejected)', () => {
    const userReducer = userSlice.reducer;
    const thunkAction = { type: registrationUserThunk.rejected.type, error: { message: 'Ошибка регистрации' } };

    const store = userReducer(initialState, thunkAction);

    expect(store.isLoading).toBe(true);
    expect(store.error).toBe('Ошибка регистрации');
  });

  test('Успешная регистрация пользователя (registrationUserThunk.fulfilled)', () => {
    const userReducer = userSlice.reducer;
    const thunkAction = { type: registrationUserThunk.fulfilled.type, payload: { user: userData } };

    const store = userReducer(initialState, thunkAction);

    expect(store.isLoading).toBe(false);
    expect(store.isInit).toBe(true);
    expect(store.user).toEqual(userData);
  });

  test('Логин пользователя (loginUserThunk.pending)', () => {
    const userReducer = userSlice.reducer;
    const thunkAction = { type: loginUserThunk.pending.type };

    const store = userReducer(initialState, thunkAction);

    expect(store.isLoading).toBe(true);
    expect(store.user).toEqual({ email: '', name: '' });
  });

  test('Ошибка при логине пользователя (loginUserThunk.rejected)', () => {
    const userReducer = userSlice.reducer;
    const thunkAction = { type: loginUserThunk.rejected.type, error: { message: 'Ошибка логина' } };

    const store = userReducer(initialState, thunkAction);

    expect(store.isLoading).toBe(false);
    expect(store.error).toBe('Ошибка логина');
  });

  test('Успешный логин пользователя (loginUserThunk.fulfilled)', () => {
    const userReducer = userSlice.reducer;
    const thunkAction = { type: loginUserThunk.fulfilled.type, payload: { user: userData } };

    const store = userReducer(initialState, thunkAction);

    expect(store.isLoading).toBe(false);
    expect(store.isInit).toBe(true);
    expect(store.user).toEqual(userData);
  });

  test('Выход пользователя (logoutUserThunk.fulfilled)', () => {
    const userReducer = userSlice.reducer;
    const thunkAction = { type: logoutUserThunk.fulfilled.type };

    const store = userReducer(initialState, thunkAction);

    expect(store.user).toEqual({ email: '', name: '' });
    expect(store.isInit).toBe(false);
  });

  test('Обновление данных пользователя (updateUserThunk.fulfilled)', () => {
    const updatedUserData = { email: 'new@example.com', name: 'Updated User' };
    const userReducer = userSlice.reducer;
    const thunkAction = { type: updateUserThunk.fulfilled.type, payload: { user: updatedUserData } };

    const store = userReducer(initialState, thunkAction);

    expect(store.isInit).toBe(true);
    expect(store.user).toEqual(updatedUserData);
  });

  test('Ошибка при обновлении данных пользователя (updateUserThunk.rejected)', () => {
    const userReducer = userSlice.reducer;
    const thunkAction = { type: updateUserThunk.rejected.type, error: { message: 'Ошибка обновления' } };

    const store = userReducer(initialState, thunkAction);

    expect(store.isInit).toBe(false);
    expect(store.error).toBe('Ошибка обновления');
  });
});
