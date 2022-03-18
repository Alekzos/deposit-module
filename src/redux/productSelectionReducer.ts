import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "./productSelectionSlice";

export const rootReducer = combineReducers({
  productReducer,
});
