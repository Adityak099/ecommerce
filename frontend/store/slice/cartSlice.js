import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existingItem = state.cart.find(
        (cartItem) => cartItem.product_id === item.product_id
      );
      if (existingItem) {
        existingItem.quantity += 1;
        return;
      }
      state.cart.push({ ...item, quantity: 1 });
    },
    removeFromCart: (state, action) => {
      const productIdToRemove = action.payload;
      const indexToRemove = state.cart.findIndex(
        (cartItem) => cartItem.product_id === productIdToRemove
      );
      if (indexToRemove !== -1) {
        state.cart = [
          ...state.cart.slice(0, indexToRemove),
          ...state.cart.slice(indexToRemove + 1),
        ];
      }
    },

    incrementQuantity: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.cart.find(
        (cartItem) => cartItem.product_id === itemId
      );
      existingItem.quantity += 1;
    },
    decrementQuantity: (state, action) => {
      const productIdToDecrement = action.payload;

      const existingItem = state.cart.find(
        (cartItem) => cartItem.product_id === productIdToDecrement
      );

      if (existingItem.quantity === 1) {
        const indexToRemove = state.cart.findIndex(
          (cartItem) => cartItem.product_id === productIdToDecrement
        );
        if (indexToRemove !== -1) {
          state.cart.splice(indexToRemove, 1);
        }
        return;
      }
      existingItem.quantity -= 1;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decrementQuantity,
  incrementQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
