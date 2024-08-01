import { apiSlice } from "./apiSlice";
import { ORDERS_URL } from "../constants";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: { ...order },
      }),
    }),
    getOrder: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
        method: "GET",
      }),
    }),
    verifyPayment: builder.mutation({
      query: (paymentData) => ({
        url: `${ORDERS_URL}/verify-payment`,
        method: "POST",
        body: { ...paymentData },
      }),
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderQuery, useVerifyPaymentMutation } = orderApiSlice;
