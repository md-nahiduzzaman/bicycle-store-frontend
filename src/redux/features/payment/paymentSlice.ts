import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Create PaymentIntent (async action)
export const createPaymentIntent = createAsyncThunk(
  "payment/createPaymentIntent",
  async (amount: number) => {
    const response = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    });

    const data = await response.json();
    return data.clientSecret;
  }
);

// Payment State
interface PaymentState {
  clientSecret: string | null;
  error: string | null;
}

const initialState: PaymentState = {
  clientSecret: null,
  error: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.clientSecret = action.payload;
        state.error = null;
      })
      .addCase(createPaymentIntent.rejected, (state) => {
        state.clientSecret = null;
        state.error = "Failed to create payment intent";
      });
  },
});

export default paymentSlice.reducer;
