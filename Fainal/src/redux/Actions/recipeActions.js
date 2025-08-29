import axios from "axios";

// Action types
export const ADD_RECIPE = "ADD_RECIPE";
export const UPDATE_RECIPE = "UPDATE_RECIPE";
export const FETCH_RECIPES = "FETCH_RECIPES";
export const FETCH_RECIPE_BY_ID = "FETCH_RECIPE_BY_ID";
export const FETCH_RECIPES_REQUEST = "FETCH_RECIPES_REQUEST";
export const FETCH_RECIPES_SUCCESS = "FETCH_RECIPES_SUCCESS";
export const FETCH_RECIPES_FAIL = "FETCH_RECIPES_FAIL";
export const DELETE_RECIPE = "DELETE_RECIPE";

// Helper to generate short IDs
const generateShortId = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Add new recipe
export const addNewRecipe = (recipe) => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/recipes");
    let newId;
    let isUnique = false;
    while (!isUnique) {
      newId = generateShortId();
      isUnique = !res.data.find((item) => item.id === newId);
    }

    const newRecipe = { id: newId, ...recipe };
    await axios.post("http://localhost:5000/recipes", newRecipe);
    dispatch({ type: ADD_RECIPE, payload: newRecipe });
  } catch (error) {
    console.error("Add recipe failed:", error);
  }
};

// Update recipe
export const updateRecipeData = (id, recipe) => async (dispatch) => {
  try {
    await axios.put(`http://localhost:5000/recipes/${id}`, recipe);
    dispatch({ type: UPDATE_RECIPE, payload: { id, ...recipe } });
  } catch (error) {
    console.error("Update recipe failed:", error);
  }
};

// Fetch all recipes
export const fetchAllRecipes = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_RECIPES_REQUEST });
    const res = await axios.get("http://localhost:5000/recipes");
    dispatch({ type: FETCH_RECIPES_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: FETCH_RECIPES_FAIL, payload: error.message });
  }
};

// Fetch recipe by ID
export const fetchRecipeById = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_RECIPE_BY_ID + "_REQUEST" });
    const res = await axios.get(`http://localhost:5000/recipes/${id}`);
    dispatch({ type: FETCH_RECIPE_BY_ID + "_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: FETCH_RECIPE_BY_ID + "_FAIL", payload: err.message });
  }
};

// Delete recipe
export const deleteRecipe = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/recipes/${id}`);
    dispatch({ type: DELETE_RECIPE, payload: id });
  } catch (err) {
    console.error("Delete recipe failed:", err);
  }
};
