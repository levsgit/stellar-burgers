import { getIngredientsApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

interface IngredientState {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null | undefined;
}

const initialState: IngredientState = {
  ingredients: [],
  isLoading: false,
  error: null
};

export const getInridientsThunk = createAsyncThunk(
  'ingredients/get',
  async () => getIngredientsApi()
);

export const ingridientsSlice = createSlice({
  name: 'ingridients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getInridientsThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getInridientsThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getInridientsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.ingredients = action.payload;
    });
  }
});

export default ingridientsSlice;
