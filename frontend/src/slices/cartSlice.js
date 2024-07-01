import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const addDecimals = (num) => {
    return (Math.round(num * 100) /100).toFixed(2);
}
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

        //Calculate items Price
        state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.listPrice * item.quantity, 0));

        //Calculate Shipping price (if the order id over 500Rs then free shipping, else 49rs shipping).
        state.shippingPrice = addDecimals(state.itemsPrice > 500 ? 0 : 50);

        //Calculate tax price (18% tax)
       state.taxPrice = addDecimals(Number((0.18 * state.itemsPrice).toFixed(2)));

       //Calculate Total Price
       state.totalPrice = (
        Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)
       ).toFixed(2);

       localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
