import axios from "axios";

// API endpoint for recipes (json-server should have "recipes" array in db.json)
const API_URL = "http://localhost:3000/recipes";

// ================= Action Types =================
export const LOADING = "LOADING";
export const ADD_RECIPE_SUC = "ADD_RECIPE_SUC";
export const ADD_RECIPE_REJ = "ADD_RECIPE_REJ";
export const GET_ALL_RECIPES_SUC = "GET_ALL_RECIPES_SUC";
export const GET_ALL_RECIPES_REJ = "GET_ALL_RECIPES_REJ";
export const GET_RECIPE = "GET_RECIPE";
export const GET_RECIPE_REJ = "GET_RECIPE_REJ";
export const UPDATE_RECIPE = "UPDATE_RECIPE";
export const DELETE_RECIPE = "DELETE_RECIPE";

// ================= Sync Actions =================
export const loading = () => ({ type: LOADING });

export const addRecipeSUC = () => ({ type: ADD_RECIPE_SUC });
export const addRecipeRej = (err) => ({ type: ADD_RECIPE_REJ, payload: err });

export const getAllRecipes = (data) => ({ type: GET_ALL_RECIPES_SUC, payload: data });
export const getRecipesRej = (err) => ({ type: GET_ALL_RECIPES_REJ, payload: err });

export const getRecipe = (data) => ({ type: GET_RECIPE, payload: data });
export const getRecipeRej = (err) => ({ type: GET_RECIPE_REJ, payload: err });

export const updateRecipe = () => ({ type: UPDATE_RECIPE });
export const deleteRecipe = () => ({ type: DELETE_RECIPE });

// ================= Async Actions =================

// get all recipes
export const getAllRecipesAsync = () => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      let res = await axios.get(API_URL);
      dispatch(getAllRecipes(res.data));
    } catch (error) {
      console.error(error);
      dispatch(getRecipesRej(error.message));
    }
  };
};

// add new recipe
export const addRecipeAsync = (data) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      await axios.post(API_URL, data);
      dispatch(addRecipeSUC());
      dispatch(getAllRecipesAsync()); // refresh list
    } catch (error) {
      console.error(error);
      dispatch(addRecipeRej(error.message));
    }
  };
};

// delete recipe
export const deleteRecipeAsync = (id) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      await axios.delete(`${API_URL}/${id}`);
      dispatch(deleteRecipe());
      dispatch(getAllRecipesAsync());
    } catch (error) {
      console.error(error);
      dispatch(addRecipeRej(error.message));
    }
  };
};

// get single recipe
export const getRecipeAsync = (id) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      let res = await axios.get(`${API_URL}/${id}`);
      dispatch(getRecipe(res.data));
    } catch (error) {
      console.error(error);
      dispatch(getRecipeRej(error.message));
    }
  };
};

// update recipe
export const updateRecipeAsync = (data) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      await axios.put(`${API_URL}/${data.id}`, data);
      dispatch(updateRecipe());
      dispatch(getAllRecipesAsync());
    } catch (error) {
      console.error(error);
      dispatch(addRecipeRej(error.message));
    }
  };
};
