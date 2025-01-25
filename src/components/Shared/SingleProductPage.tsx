import { Button } from "../ui/button";

const SingleProductPage = () => {
  return (
    <div className="container mx-auto mt-12">
      {/* Product Section */}
      <div className="flex flex-wrap gap-20 lg:flex-nowrap">
        {/* Product Image */}
        <div className="w-full lg:w-1/2">
          <div className="relative">
            <img
              src="https://motto-spin.myshopify.com/cdn/shop/files/1_3d7043df-69aa-4cce-ac02-eb9d90301e66.jpg?v=1730455869&width=750"
              alt="Bike Cable Protector"
              className="object-cover w-full h-full rounded-xl"
            />
            <img
              src="https://motto-spin.myshopify.com/cdn/shop/files/Hover1_cad9495c-6264-44b2-b62c-0fa2b2ac5171.jpg?v=1730455872&width=750"
              alt="Bike Cable Protector Hover"
              className="absolute top-0 left-0 object-cover w-full h-full transition-opacity duration-300 opacity-0 rounded-xl hover:opacity-100"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full pr-60 lg:w-1/2 ">
          <h1 className="text-3xl font-semibold">Bike Cable Protector</h1>
          <p className="mt-4 text-gray-600">
            Protect your bike's cables with this premium carbon fiber protector.
            Durable, lightweight, and stylish, it ensures long-lasting
            performance and a sleek look.
          </p>

          {/* Price */}
          <div className="mt-6">
            <p className="text-2xl font-bold text-gray-800">$49.00</p>
            <p className="mt-2 text-sm text-gray-500 line-through">$59.00</p>
          </div>

          {/* Quantity Selector */}
          <div className="mt-4">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              defaultValue="1"
              className="w-20 px-3 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Add to Cart Button */}
          <div className="mt-6">
            <Button className="w-full py-3 text-lg">Add to Cart</Button>
          </div>

          {/* Additional Details */}
          <div className="mt-8 space-y-4">
            <div>
              <h3 className="text-lg font-medium">Features</h3>
              <ul className="mt-2 text-gray-600 list-disc list-inside">
                <li>Lightweight carbon fiber material</li>
                <li>Easy to install</li>
                <li>Durable and weather-resistant</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium">Shipping Information</h3>
              <p className="mt-2 text-gray-600">
                Ships within 2-3 business days. Free shipping on orders over
                $100.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
