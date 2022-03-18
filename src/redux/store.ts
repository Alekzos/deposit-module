import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./productSelectionReducer";

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
// export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;

// export type AppStore = ReturnType<typeof store>;
// export type AppDispatch = AppStore["dispatch"];
