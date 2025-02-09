import { Button } from "@/components/ui/button";
import {
  removeFromCart,
  updateQuantity,
} from "@/redux/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";
import { RootState } from "@/redux/store";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import PaymentForm from "@/components/Shared/PaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

type CartItem = {
  product: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
};

const MainCartPage = () => {
  const dispatch = useDispatch();

  const { items, totalPrice } = useSelector((state: RootState) => state.cart);
  console.log(items);

  const user = useAppSelector(selectCurrentUser);
  console.log(user);

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
