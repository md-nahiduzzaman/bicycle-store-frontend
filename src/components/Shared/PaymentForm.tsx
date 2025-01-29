import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";

import { setClientSecret } from "@/redux/features/payment/paymentSlice";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { useCreatePaymentIntentMutation } from "@/redux/features/payment/payment";

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
      // Step 1: Create payment intent via Redux (API)
      const { data, error } = await createPaymentIntent({
        amount: totalPrice * 100,
      }); // amount in cents

      if (error) {
        dispatch(setClientSecret(null)); // Reset client secret if error
        toast.error("Failed to create payment intent.");
        setLoading(false);
        return;
      }

      // Step 2: Store client secret in Redux
      dispatch(setClientSecret(data.clientSecret));

      // Step 3: Confirm card payment
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else if (result.paymentIntent?.status === "succeeded") {
        toast.success("Payment successful!");
        onPaymentSuccess();
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

// import { Button } from "@/components/ui/button";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { useState } from "react";
// import { toast } from "sonner";
// import axios from "axios";

// const PaymentForm = ({
//   totalPrice,
//   onPaymentSuccess,
// }: {
//   totalPrice: number;
//   onPaymentSuccess: () => void;
// }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     if (!stripe || !elements) {
//       toast.error("Stripe is not loaded yet!");
//       setLoading(false);
//       return;
//     }

//     const cardElement = elements.getElement(CardElement);

//     if (!cardElement) {
//       toast.error("Card Element not found!");
//       setLoading(false);
//       return;
//     }

//     try {
//       // Fetch the client secret from the backend
//       const { data } = await axios.post(
//         "http://localhost:5000/api/payment/create-payment-intent",
//         {
//           amount: totalPrice * 100, // amount in cents
//         }
//       );

//       const { error, paymentIntent } = await stripe.confirmCardPayment(
//         data.clientSecret,
//         {
//           payment_method: {
//             card: cardElement,
//             billing_details: {
//               name: "Customer Name", // Use user info if available
//             },
//           },
//         }
//       );

//       if (error) {
//         toast.error(error.message);
//       } else if (paymentIntent?.status === "succeeded") {
//         toast.success("Payment successful!");
//         onPaymentSuccess();
//       }
//     } catch (err) {
//       console.error("Error:", err);
//       toast.error("An unexpected error occurred.");
//     }

//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement className="p-2 mb-4 border rounded" />
//       <Button type="submit" disabled={!stripe || loading}>
//         {loading ? "Processing..." : `Pay $${totalPrice}`}
//       </Button>
//     </form>
//   );
// };

// export default PaymentForm;
