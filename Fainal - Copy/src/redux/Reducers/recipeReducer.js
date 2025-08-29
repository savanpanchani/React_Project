import { FETCH_RECIPES, ADD_RECIPE, UPDATE_RECIPE, DELETE_RECIPE } from '../Actions/recipeActions';

const initialState = {
  list: [],
};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RECIPES:
      return { ...state, list: action.payload };
    case ADD_RECIPE:
      return { ...state, list: [...state.list, action.payload] };
    case UPDATE_RECIPE:
      return {
        ...state,
        list: state.list.map((r) => (r.id === action.payload.id ? action.payload : r)),
      };
    case DELETE_RECIPE:
      return { ...state, list: state.list.filter((r) => r.id !== action.payload) };
    default:
      return state;
  }
};

export default recipeReducer;
