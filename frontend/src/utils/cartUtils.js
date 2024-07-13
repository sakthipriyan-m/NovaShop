export const addDecimals = (num) => {
    return (Math.round(num * 100) /100).toFixed(2);
};

export const updateCart =(state) => {
    //Calculate items Price
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.listPrice * item.quantity, 0));

    //Calculate Shipping price (if the order is over 1000Rs then free shipping, else 50rs shipping).
    state.shippingPrice = addDecimals(state.itemsPrice > 1000 ? 0 : 50);

    //Calculate tax price (18% tax)
   state.taxPrice = addDecimals(Number((0.18 * state.itemsPrice).toFixed(2)));

   //Calculate Total Price
   state.totalPrice = (
    Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)
   ).toFixed(2);

   localStorage.setItem('cart', JSON.stringify(state));

   return state;
}