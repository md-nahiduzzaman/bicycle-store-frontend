import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";

import { setClientSecret } from "@/redux/features/payment/paymentSlice";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { useCreatePaymentIntentMutation } from "@/redux/features/payment/payment";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { useCreateOrderMutation } from "@/redux/features/order/order";

const PaymentForm = ({
  totalPrice,
  onPaymentSuccess,
}: {
  totalPrice: number;
  onPaymentSuccess: () => void;
}) => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const [createPaymentIntent, { isLoading: isApiLoading }] =
    useCreatePaymentIntentMutation();

  const [createOrder] = useCreateOrderMutation(); // ✅ Order create mutation

  const user = useAppSelector(selectCurrentUser);
  const items = useAppSelector((state) => state.cart.items);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      toast.error("Stripe has not yet loaded.");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      toast.error("Card Element not found.");
      setLoading(false);
      return;
    }

    try {
      // Step 1: Create payment intent
      const { data, error } = await createPaymentIntent({
        amount: totalPrice * 100,
      }); // amount in cents

      if (error) {
        dispatch(setClientSecret(null));
        toast.error("Failed to create payment intent.");
        setLoading(false);
        return;
      }

      // Step 2: Store client secret in Redux
      dispatch(setClientSecret(data.clientSecret));

      // Step 3: Confirm payment
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else if (result.paymentIntent?.status === "succeeded") {
        toast.success("Payment successful!");

        // Step 4: Create Order in Database ✅
        const orderData = {
          email: user?.email,
          cartItems: items.map((item) => ({
            product: item.product,
            quantity: item.quantity,
          })),
          totalPrice,
          paymentData: {
            paymentIntentId: result.paymentIntent.id,
            paymentAmount: result.paymentIntent.amount,
          },
        };

        const orderResponse = await createOrder(orderData);
        if ("error" in orderResponse) {
          toast.error("Order creation failed!");
        } else {
          toast.success("Order placed successfully!");
          dispatch(clearCart());
          onPaymentSuccess();
        }
      }

      setLoading(false);
    } catch (err) {
      toast.error("An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className="p-2 mb-4 border rounded" />
      <Button type="submit" disabled={!stripe || loading || isApiLoading}>
        {loading || isApiLoading ? "Processing..." : `Pay $${totalPrice}`}
      </Button>
    </form>
  );
};

export default PaymentForm;
