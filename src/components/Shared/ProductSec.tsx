import ProductCard from "./ProductCard";

const ProductSec = () => {
  return (
    <div className="container px-6 py-10 mx-auto">
      <h1 className="text-5xl">Microphone & Accessories</h1>
      <hr className="mt-8 mb-4 border-gray-300" />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};

export default ProductSec;
