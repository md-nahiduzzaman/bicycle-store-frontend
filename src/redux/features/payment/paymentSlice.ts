import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaymentState {
  clientSecret: string | null;
}

const initialState: PaymentState = {
  clientSecret: null as string | null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setClientSecret: (state, action: PayloadAction<string | null>) => {
      state.clientSecret = action.payload;
    },
  },
});

export const { setClientSecret } = paymentSlice.actions;
export default paymentSlice.reducer;
