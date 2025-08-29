import { configureStore } from '@reduxjs/toolkit';
import recipeReducer from './Reducers/recipeReducer';

export const store = configureStore({
  reducer: {
    recipes: recipeReducer,
  },
});
