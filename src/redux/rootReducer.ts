import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "./productReducer";
import userReducer from "./userReducer";

export const rootReducer = combineReducers({
  productReducer,
  userReducer,
});
