import { Button } from "@/components/ui/button";
import {
  removeFromCart,
  updateQuantity,
} from "@/redux/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";

const MainCartPage = () => {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);

  const handleRemoveItem = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    dispatch(updateQuantity({ id: productId, quantity }));
  };

  return (
    <div className="container w-3/6 min-h-screen px-6 mx-auto">
      <h1 className="mb-4 text-2xl font-semibold text-center">Your Cart</h1>

      {/* Cart Items */}
      <div className="p-10 bg-white rounded-lg ">
        {items.length > 0 ? (
          <>
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.product} className="flex items-center gap-4">
                  <img
                    src={
                      item.imageUrl ||
                      "https://img.freepik.com/free-photo/cool-bicycle-studio_23-2150884204.jpg?t=st=1737894564~exp=1737898164~hmac=db9c2c50023a1e3f068366e6d27de34ae66a81f4cf39373674395922d397fdff&w=740"
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

                  {/* Quantity Counter */}
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

                  {/* Total Price for Item */}
                  <p className="text-sm font-semibold font-number">
                    ${item.price * item.quantity}
                  </p>
                </li>
              ))}
            </ul>
            <div className="my-4 border-t"></div>
            {/* Total Price */}
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
              <Button>Place Your Order</Button>
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
