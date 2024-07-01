export const addDecimals = (num) => {
    return (Math.round(num * 100) /100).toFixed(2);
};

export const updateCart =(state) => {
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

   return state;
}