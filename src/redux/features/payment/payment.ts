/* eslint-disable @typescript-eslint/no-explicit-any */
// paymentSlice.ts is a Redux slice that uses createAsyncThunk to create a payment intent. The slice has a clientSecret and error state, and two reducers that update the state based on the promise returned by createPaymentIntent. The slice is exported as the default export.
import { baseApi } from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation<any, { amount: number }>({
      query: (body) => ({
        url: "payment/create-payment-intent", // API endpoint for payment intent
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreatePaymentIntentMutation } = paymentApi;
