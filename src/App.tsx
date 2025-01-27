import "./App.css";
import Banner from "./components/Shared/Banner";
import ProductCard from "./components/Shared/ProductCard";

import { useGetProductsQuery } from "./redux/features/product/product";
import { TProduct } from "./types";

function App() {
  const { isLoading, data, error } = useGetProductsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  console.log(data);

  return (
    <div>
      <div className="h-screen">
        <Banner />
      </div>

      {/* Product Section */}
      <div className="container px-6 py-10 mx-auto">
        <h1 className="text-5xl font-semibold">Microphone & Accessories</h1>
        <hr className="mt-8 mb-4 border-gray-300" />

        {/* Loading State */}
        {isLoading && <p>Loading products...</p>}

        {/* Error State */}
        {error && <p className="text-red-500">Failed to load products.</p>}

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data?.data?.map((product: TProduct) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
