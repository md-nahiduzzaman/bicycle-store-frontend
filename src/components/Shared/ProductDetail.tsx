import { useGetProductByIdQuery } from "@/redux/features/product/product";
import { useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useState } from "react";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useGetProductByIdQuery(id);

  const [quantity, setQuantity] = useState(1);

  // Handle loading and errors
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;
  if (!data?.data) return <p>Product not found</p>;

  const product = data.data;

  // Handle quantity change
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(
      1,
      Math.min(Number(e.target.value), product.quantity)
    );
    setQuantity(value);
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity,
        stock: product.quantity,
        imageUrl: product.imageUrl || "",
      })
    );
  };

  return (
    <div className="container mx-auto mt-28 mb-28">
      {/* Product Section */}
      <div className="flex flex-wrap gap-20 lg:flex-nowrap">
        {/* Product Image */}
        <div className="w-full lg:w-1/2">
          <div className="relative">
            <img
              src={
                product.image ||
                "https://motto-spin.myshopify.com/cdn/shop/files/1_3d7043df-69aa-4cce-ac02-eb9d90301e66.jpg?v=1730455869&width=750"
              }
              alt={product.name}
              className="object-cover w-full h-[60%] rounded-xl"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full pr-60 lg:w-1/2">
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          <p className="mt-4 text-gray-600">{product.description}</p>

          {/* Price */}
          <div className="mt-6">
            <p className="text-2xl font-bold text-gray-800">${product.price}</p>
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
              max={product.quantity}
              value={quantity}
              onChange={handleQuantityChange}
              className="w-20 px-3 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Add to Cart Button */}
          <Button className="w-1/2 mt-4" onClick={handleAddToCart}>
            Add to Cart
          </Button>

          {/* Additional Details */}
          <div className="mt-8 space-y-4">
            <div>
              <h3 className="text-lg font-medium">Brand</h3>
              <p className="mt-2 text-gray-600">{product.brand}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium">Type</h3>
              <p className="mt-2 text-gray-600">{product.type}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium">In Stock</h3>
              <p className="mt-2 text-gray-600">
                {product.inStock ? "Yes" : "No"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
