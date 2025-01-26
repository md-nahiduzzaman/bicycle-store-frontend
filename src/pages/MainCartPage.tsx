import { Button } from "@/components/ui/button";

const MainCartPage = () => {
  return (
    <div className="container w-3/6 min-h-screen px-6 mx-auto">
      <h1 className="mb-4 text-2xl font-semibold text-center">Your Cart</h1>
      {/* Cart Items */}

      <div className="p-10 bg-white rounded-lg ">
        {/* all cart item */}
        <ul className="space-y-4">
          <li className="flex items-center gap-4">
            <img
              src="https://img.freepik.com/free-photo/cool-bicycle-studio_23-2150884204.jpg?t=st=1737894564~exp=1737898164~hmac=db9c2c50023a1e3f068366e6d27de34ae66a81f4cf39373674395922d397fdff&w=740"
              alt="product name"
              className="object-cover w-16 h-16 rounded"
            />

            <div className="flex-1">
              <h1 className="text-sm font-medium">Item Name</h1>

              {/* remove btn */}
              <button className="text-sm text-red-600 hover:underline">
                Remove
              </button>
            </div>

            {/* counter btn */}
            <div className="flex items-center gap-2 mt-1 mr-8">
              <button className="w-6 h-6 bg-gray-200 rounded hover:bg-gray-300">
                +
              </button>
              <span className="text-sm font-medium">2</span>
              <button className="w-6 h-6 bg-gray-200 rounded hover:bg-gray-300">
                -
              </button>
            </div>

            {/* total price */}
            <p className="text-sm font-semibold">220 Tk</p>
          </li>
        </ul>
        <div className="my-4 border-t"></div>
        {/* total price  */}
        <div className="flex justify-end gap-8">
          <span className="text-lg font-semibold"> Total Price </span>
          <span className="text-lg font-bold">520tk</span>
        </div>
        <div className="my-4 border-t"></div>

        <div className="flex justify-end">
          <Button>Place Your Order</Button>
        </div>
        {/* checkout button */}
      </div>
    </div>
  );
};

export default MainCartPage;
