import "./App.css";
import Banner from "./components/Shared/Banner";
import ProductCard from "./components/Shared/ProductCard";
import { useNavigate } from "react-router-dom";

import { useGetProductsQuery } from "./redux/features/product/product";
import { TProduct } from "./types";
import { Button } from "./components/ui/button";
import Testimonial from "./components/Shared/Testimonial";

function App() {
  const navigate = useNavigate();

  // Query to fetch products
  const { isLoading, data, error } = useGetProductsQuery(
    { searchTerm: "" },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  console.log(data);

  // Show only first 8 products
  const products = data?.data?.slice(0, 8) || [];

  return (
    <div>
      {/* Banner Section */}
      <div className="h-[600px] overflow-hidden">
        <Banner />
      </div>

      {/* Product Section */}
      <div className="container px-6 py-10 mx-auto mb-8 mt-28">
        <h1 className="text-3xl font-semibold text-center md:text-5xl">
          Discover Your Perfect Bike
        </h1>
        <p className="mt-4 text-lg text-center text-gray-600 md:text-xl md:w-[50%] mx-auto">
          Find the best bicycles for your adventure, whether it's for city
          commuting, mountain trails, or a leisurely ride. Shop now and
          experience the thrill!
        </p>

        {/* Loading State */}
        {isLoading && (
          <p className="text-lg text-center">Loading products...</p>
        )}

        {/* Error State */}
        {error && (
          <p className="text-lg text-center text-red-500">
            Failed to load products.
          </p>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-8 mt-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product: TProduct) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* Load More Button */}
        {data?.data?.length > 8 && (
          <div className="flex justify-center mt-16 mb-8">
            <Button onClick={() => navigate("/products")} size={"lg"}>
              View All
            </Button>
          </div>
        )}
      </div>

      {/* Testimonial Section */}
      <div className="">
        <div className="container px-6 mx-auto text-center mt-28">
          <h2 className="text-3xl font-semibold text-center md:text-5xl">
            What Our Customers Are Saying
          </h2>
          <p className="mt-4 text-lg text-center text-gray-600 md:text-xl md:w-[50%] mx-auto">
            Hear from cyclists who have experienced our top-quality bikes and
            exceptional customer service.
          </p>
          <Testimonial />
        </div>
      </div>
    </div>
  );
}

export default App;
