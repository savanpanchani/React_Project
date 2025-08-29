const initialState = {
  recipes: [],
  recipe: null,
  isLoading: false,
  isError: "",
  isCreated: false,
  isUpdated: false,
};

export const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, isLoading: true, isError: "" };

    case "ADD_RECIPE_SUC":
      return { ...state, isCreated: true, isLoading: false };

    case "ADD_RECIPE_REJ":
      return { ...state, isError: action.payload, isLoading: false };

    case "GET_ALL_RECIPES_SUC":
      return {
        ...state,
        recipes: action.payload,
        isLoading: false,
        isCreated: false,
        isUpdated: false,
        isError: "",
      };

    case "GET_ALL_RECIPES_REJ":
      return { ...state, isError: action.payload, isLoading: false };

    case "GET_RECIPE":
      return { ...state, recipe: action.payload, isLoading: false };

    case "GET_RECIPE_REJ":
      return { ...state, recipe: null, isError: action.payload, isLoading: false };

    case "UPDATE_RECIPE":
      return { ...state, isUpdated: true, isLoading: false };

    case "DELETE_RECIPE":
      return { ...state, isLoading: false };

    default:
      return state;
  }
};
