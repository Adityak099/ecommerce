import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  total: 0,
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
      } else {
        state.cart.push({ ...item, quantity: 1 });
      }
      state.total = state.cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
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
        state.total = state.cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      }
    },
    incrementQuantity: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.cart.find(
        (cartItem) => cartItem.product_id === itemId
      );
      if (existingItem) {
        existingItem.quantity += 1;
        state.total = state.cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      }
    },
    decrementQuantity: (state, action) => {
      const productIdToDecrement = action.payload;
      const existingItem = state.cart.find(
        (cartItem) => cartItem.product_id === productIdToDecrement
      );
      if (existingItem) {
        if (existingItem.quantity === 1) {
          const indexToRemove = state.cart.findIndex(
            (cartItem) => cartItem.product_id === productIdToDecrement
          );
          if (indexToRemove !== -1) {
            state.cart = [
              ...state.cart.slice(0, indexToRemove),
              ...state.cart.slice(indexToRemove + 1),
            ];
          }
        } else {
          existingItem.quantity -= 1;
        }
        state.total = state.cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      }
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
