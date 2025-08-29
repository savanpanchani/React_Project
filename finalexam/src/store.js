import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { thunk } from "redux-thunk";   // ✅ FIXED
import { recipeReducer } from "./Services/Reducers/recipeReducer";
import { userReducer } from "./Services/Reducers/userReducer";

const rootReducer = combineReducers({
  recipeReducer,
  userReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
