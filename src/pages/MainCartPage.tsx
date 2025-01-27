import { Button } from "@/components/ui/button";
import {
  removeFromCart,
  updateQuantity,
} from "@/redux/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";
import { RootState } from "@/redux/store";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

type CartItem = {
  product: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
};

const PaymentForm = ({
  totalPrice,
  onPaymentSuccess,
}: {
  totalPrice: number;
  onPaymentSuccess: () => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      toast.error("Stripe is not loaded yet!");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      toast.error("Card Element not found!");
      setLoading(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Payment successful!");
      onPaymentSuccess();
    } catch (err) {
      console.log("Error:", err);
      toast.error("An unexpected error occurred.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className="p-2 mb-4 border rounded" />
      <Button type="submit" disabled={!stripe || loading}>
        {loading ? "Processing..." : `Pay $${totalPrice}`}
      </Button>
    </form>
  );
};

const MainCartPage = () => {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);
  const [dialogOpen, setDialogOpen] = useState(false); // State for dialog

  const handleRemoveItem = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    dispatch(updateQuantity({ id: productId, quantity }));
  };

  const handlePaymentSuccess = () => {
    setDialogOpen(false); // Close the dialog
  };

  return (
    <div className="container w-3/6 min-h-screen px-6 mx-auto">
      <h1 className="mb-4 text-2xl font-semibold text-center">Your Cart</h1>

      <div className="p-10 bg-white rounded-lg">
        {items.length > 0 ? (
          <>
            <ul className="space-y-4">
              {items.map((item: CartItem) => (
                <li key={item.product} className="flex items-center gap-4">
                  <img
                    src={
                      item.imageUrl ||
                      "https://img.freepik.com/free-photo/cool-bicycle-studio_23-2150884204.jpg"
                    }
                    alt={item.name}
                    className="object-cover w-16 h-16 rounded"
                  />

                  <div className="flex-1">
                    <h1 className="text-sm font-medium">{item.name}</h1>

                    <MdDeleteOutline
                      className="mt-2 text-xl text-red-600 hover:underline"
                      onClick={() => handleRemoveItem(item.product)}
                    />
                  </div>

                  <div className="flex items-center gap-2 mt-1 mr-8">
                    <button
                      className="w-6 h-6 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() =>
                        handleUpdateQuantity(item.product, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                    <span className="text-sm font-medium">{item.quantity}</span>
                    <button
                      className="w-6 h-6 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() =>
                        handleUpdateQuantity(item.product, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                  </div>

                  <p className="text-sm font-semibold font-number">
                    ${item.price * item.quantity}
                  </p>
                </li>
              ))}
            </ul>
            <div className="my-4 border-t"></div>
            <div className="flex justify-end gap-8">
              <span className="text-lg font-semibold font-heading">
                Total Price
              </span>
              <span className="text-lg font-bold font-number">
                ${totalPrice}
              </span>
            </div>
            <div className="my-4 border-t"></div>

            <div className="flex justify-end">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">Place Your Order</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Payment</DialogTitle>
                    <DialogDescription>
                      Enter your payment details to complete the order.
                    </DialogDescription>
                  </DialogHeader>

                  <Elements stripe={stripePromise}>
                    <PaymentForm
                      totalPrice={totalPrice}
                      onPaymentSuccess={handlePaymentSuccess}
                    />
                  </Elements>
                </DialogContent>
              </Dialog>
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="text-lg font-medium">Your cart is empty!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainCartPage;
