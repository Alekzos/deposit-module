import { combineReducers } from "@reduxjs/toolkit";

//как работает эта магия? Ведь там нет productReducer
import productReducer from "./productSelectionSlice";

export const rootReducer = combineReducers({
  productReducer,
});
