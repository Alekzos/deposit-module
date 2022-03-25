import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../data/types";

interface ProductState {
  selectedUser: IUser;
}

// Define the initial state using that type
const initialState: ProductState = {
  selectedUser: {
    id: 0,
    login: "",
    password: "",
    accounts: [],
    usd: [],
    rub: [],
    name: "",
    surname: "",
    patronymic: "",
    inn: "",
    role: "",
  },
};

export const selectUserSlice = createSlice({
  name: "selectUser",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { setUser } = selectUserSlice.actions;
export default selectUserSlice.reducer;
