import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../pages/Login/types";
import { userInitialValue } from "../pages//Login/consts";
interface UserState {
  selectedUser: IUser;
}

// Define the initial state using that type
const initialState: UserState = {
  selectedUser: userInitialValue,
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
