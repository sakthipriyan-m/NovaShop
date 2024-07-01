import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
        const item = action.payload;
        
        const existItem =state.cartItems.find((x)=>x.id === item.id);
        if(existItem){
            //update the exisiting item with new qty 
            // state.cartItems = state.cartItems.map((x)=> x.id === existItem.id ? item : x); 

            // Update existing item's qty adding new qty to the current qty.
            existItem.quantity +=item.quantity;
        } else {
            state.cartItems = [...state.cartItems, item];
        }

        return updateCart(state);
        
    },
  },
});
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
