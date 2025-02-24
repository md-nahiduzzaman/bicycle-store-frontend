import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/Shared/ProductCard";
import { useGetProductsQuery } from "@/redux/features/product/product";
import { TProduct } from "@/types";
import { Loader2 } from "lucide-react";

const AllProduct = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    priceRange: "",
    model: "",
    brand: "all",
    category: "all",
    inStock: "all" as string | boolean,
  });

  // Debugging: Log the filters to ensure they are updating
  useEffect(() => {
    console.log("Current filters:", filters);
  }, [filters]);

  const { isLoading, data, error } = useGetProductsQuery(
    { searchTerm, filters },
    { refetchOnMountOrArgChange: true }
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 text-gray-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-red-500">An error occurred. Please try again later.</p>
    );
  }

  return (
    <div>
      {/* Hero Image */}
      <div className="mb-8 h-[200px] overflow-hidden bg-cover">
        <img
          src="https://images.unsplash.com/photo-1601391721091-4646369e0bb5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Bicycles"
          className="object-cover object-center w-full h-full"
        />
      </div>

      <div className="container py-8 mx-auto">
        <h1 className="mt-16 mb-10 text-6xl font-semibold text-center">
          All Bicycles
        </h1>

        {/* Search & Filters */}
        <div className="flex flex-wrap items-center gap-4 mx-auto mb-10 max-w-7xl">
          <Input
            placeholder="Search by name, brand, category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-1/3"
          />

          {/* Brand Filter */}
          <Select
            onValueChange={(value) => setFilters({ ...filters, brand: value })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Brands</SelectItem>
              <SelectItem value="Trek">Trek</SelectItem>
              <SelectItem value="Giant">Giant</SelectItem>
              <SelectItem value="Specialized">Specialized</SelectItem>
            </SelectContent>
          </Select>

          {/* Category Filter */}
          <Select
            onValueChange={(value) =>
              setFilters({ ...filters, category: value })
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Mountain">Mountain</SelectItem>
              <SelectItem value="Road">Road</SelectItem>
              <SelectItem value="Hybrid">Hybrid</SelectItem>
            </SelectContent>
          </Select>

          {/* Availability Filter */}
          <Select
            onValueChange={(value) => {
              const inStockValue =
                value === "in_stock"
                  ? true
                  : value === "out_of_stock"
                  ? false
                  : true;
              console.log("Selected inStock value: ", inStockValue); // Log the value
              setFilters({
                ...filters,
                inStock: inStockValue,
              });
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="in_stock">In Stock</SelectItem>
              <SelectItem value="out_of_stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={() =>
              setFilters({
                priceRange: "",
                model: "",
                brand: "all",
                category: "all",
                inStock: "all", // Reset to 'all'
              })
            }
          >
            Reset Filters
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-28">
          {data?.data?.map((product: TProduct) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
