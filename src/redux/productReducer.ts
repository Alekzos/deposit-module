import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../pages/ProductSelection/types";

interface ProductState {
  selectedProduct: IProduct;
}

// Define the initial state using that type
const initialState: ProductState = {
  selectedProduct: {
    id: 0,
    title: "",
    description: "",
    interest: "",
    minSum: 0,
    maxSum: 0,
    minTerm: 0,
    maxTerm: 0,
    sumDescription: "",
    termDescription: "",
    currency: "",
    paymentPeriods: "",
    withdrawals: 0,
    earlyTermination: 0,
    depositRate: 0,
    interestCapitalization: 0,
    futureValue: 0,
    effectiveInterestRate: 0,
    interestRate: 0,
    selectedDepositSum: 0,
    selectedDepositTerm: 1,
  },
};

export const productSelectionSlice = createSlice({
  name: "selectProduct",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
});

// export const selectProduct = (state: RootState) => state.product;
export const { setProduct } = productSelectionSlice.actions;
export default productSelectionSlice.reducer;
