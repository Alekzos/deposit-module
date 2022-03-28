import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../data/types";

interface UserState {
  selectedUser: IUser;
}

// Define the initial state using that type
const initialState: UserState = {
  selectedUser: {
    id: 0,
    login: "",
    password: "",
    accounts: [],
    account: "",
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
