import axios from 'axios';

// Action types
export const FETCH_RECIPES = 'FETCH_RECIPES';
export const ADD_RECIPE = 'ADD_RECIPE';
export const UPDATE_RECIPE = 'UPDATE_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';

// API Base URL
const API_URL = 'http://localhost:3000/recipes';

// Fetch all recipes
export const fetchRecipes = () => async (dispatch) => {
  try {
    const res = await axios.get(API_URL);
    dispatch({ type: FETCH_RECIPES, payload: res.data });
  } catch (error) {
    console.error('Fetch Recipes Error:', error);
  }
};

// Add a new recipe
export const addRecipe = (recipe) => async (dispatch) => {
  try {
    const res = await axios.post(API_URL, recipe);
    dispatch({ type: ADD_RECIPE, payload: res.data });
  } catch (error) {
    console.error('Add Recipe Error:', error);
  }
};

// Update a recipe
export const updateRecipe = (id, updatedRecipe) => async (dispatch) => {
  try {
    const res = await axios.put(`${API_URL}/${id}`, updatedRecipe);
    dispatch({ type: UPDATE_RECIPE, payload: res.data });
  } catch (error) {
    console.error('Update Recipe Error:', error);
  }
};

// Delete a recipe
export const deleteRecipe = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    dispatch({ type: DELETE_RECIPE, payload: id });
  } catch (error) {
    console.error('Delete Recipe Error:', error);
  }
};
