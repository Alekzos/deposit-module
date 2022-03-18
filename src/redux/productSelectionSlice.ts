import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../data/types";

interface ProductState {
  productRTK: IProduct[];
}

// Define the initial state using that type
const initialState: ProductState = {
  productRTK: [],
};

export const productSelectionSlice = createSlice({
  name: "productRTK",
  initialState,
  reducers: {
    setProduct: (state: any, action) => {
      return { ...state, productRTK: [...action.payload] };
    },
  },
});

// export const selectProduct = (state: RootState) => state.product;
export const { setProduct } = productSelectionSlice.actions;
export default productSelectionSlice.reducer;
