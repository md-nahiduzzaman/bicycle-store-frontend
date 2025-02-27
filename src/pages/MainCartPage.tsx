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
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const { items, totalPrice } = useSelector((state: RootState) => state.cart);
  console.log(items);

  const user = useAppSelector(selectCurrentUser);
  console.log(user);

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleRemoveItem = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    dispatch(updateQuantity({ id: productId, quantity }));
  };

  const handlePaymentSuccess = () => {
    setDialogOpen(false); // Close the dialog
  };

  const handlePlaceOrder = () => {
    if (!user) {
      // If user is not logged in, redirect to login page
      navigate("/login");
    } else {
      // If user is logged in, open the payment dialog
      setDialogOpen(true);
    }
  };

  return (
    <div className="container w-full min-h-screen px-3 mx-auto md:w-4/5 lg:w-3/6 sm:px-4 md:px-6">
      <h1 className="mb-4 text-xl font-semibold text-center sm:text-2xl">
        Your Cart
      </h1>

      <div className="p-4 bg-white border rounded-lg sm:p-6 md:p-10">
        {items.length > 0 ? (
          <>
            <ul className="space-y-4">
              {items.map((item: CartItem) => (
                <li
                  key={item.product}
                  className="flex flex-col items-start gap-3 pb-3 border-b sm:flex-row sm:items-center sm:gap-4"
                >
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

                    <div className="flex items-center justify-between mt-2 sm:hidden">
                      <div className="flex items-center gap-2">
                        <button
                          className="w-6 h-6 bg-gray-200 rounded hover:bg-gray-300"
                          onClick={() =>
                            handleUpdateQuantity(
                              item.product,
                              item.quantity - 1
                            )
                          }
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          className="w-6 h-6 bg-gray-200 rounded hover:bg-gray-300"
                          onClick={() =>
                            handleUpdateQuantity(
                              item.product,
                              item.quantity + 1
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                      <p className="pl-4 text-sm font-semibold font-number">
                        ${item.price * item.quantity}
                      </p>
                    </div>

                    <MdDeleteOutline
                      className="mt-2 text-xl text-red-600 cursor-pointer hover:text-red-800"
                      onClick={() => handleRemoveItem(item.product)}
                    />
                  </div>

                  <div className="items-center hidden gap-2 mt-1 mr-4 sm:flex md:mr-8">
                    <button
                      className="w-6 h-6 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() =>
                        handleUpdateQuantity(item.product, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="text-sm font-medium">{item.quantity}</span>
                    <button
                      className="w-6 h-6 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() =>
                        handleUpdateQuantity(item.product, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <p className="hidden text-sm font-semibold sm:block font-number">
                    ${item.price * item.quantity}
                  </p>
                </li>
              ))}
            </ul>
            <div className="my-4 border-t"></div>
            <div className="flex justify-between sm:justify-end sm:gap-8">
              <span className="text-base font-semibold sm:text-lg font-heading">
                Total Price
              </span>
              <span className="text-base font-bold sm:text-lg font-number">
                ${totalPrice}
              </span>
            </div>
            <div className="my-4 border-t"></div>

            <div className="flex justify-center sm:justify-end">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={handlePlaceOrder}
                    className="w-full sm:w-auto"
                  >
                    Place Your Order
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] w-[95%] mx-auto">
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
          <div className="py-8 text-center">
            <p className="text-lg font-medium">Your cart is empty!</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => navigate("/products")}
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainCartPage;
