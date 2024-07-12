import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "Paypal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.id === item.id);

      if (existItem) {
        // Update existing item's qty by adding new qty to the current qty
        existItem.quantity += item.quantity;
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },
    increaseQuantity: (state, action) => {
      const item = state.cartItems.find((x) => x.id === action.payload);
      if (item) {
        item.quantity += 1;
      }

      return updateCart(state);
    },
    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find((x) => x.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }

      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x.id !== action.payload);

      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;

      return updateCart(state);
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  saveShippingAddress,
} = cartSlice.actions;
export default cartSlice.reducer;
