import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    removeProducts: (state) => {
      state.products = null;
    },
  },
});

export const { removeProducts, setProducts } = productsSlice.actions;
export default productsSlice.reducer;
