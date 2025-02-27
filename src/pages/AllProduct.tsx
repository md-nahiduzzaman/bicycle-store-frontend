import { useState } from "react";
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

const AllProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    type: "all",
    brand: "all",
    inStock: "all",
  });

  const { isLoading, data, error } = useGetProductsQuery({
    searchTerm,
    filters,
  });

  return (
    <div className="container py-8 mx-auto">
      <h1 className="mb-6 text-4xl font-semibold text-center">All Bicycles</h1>

      {/* Search & Filters */}
      <div className="container flex flex-wrap items-center gap-4 px-4 mx-auto mb-8">
        <Input
          placeholder="Search..."
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
            <SelectItem value="SpeedX">SpeedX</SelectItem>
            <SelectItem value="RockRider">RockRider</SelectItem>
            <SelectItem value="CityCycle">CityCycle</SelectItem>
            <SelectItem value="ExtremeX">ExtremeX</SelectItem>
            <SelectItem value="EcoRide">EcoRide</SelectItem>
            <SelectItem value="FastWheel">FastWheel</SelectItem>
            <SelectItem value="Summit">Summit</SelectItem>
            <SelectItem value="MetroBike">MetroBike</SelectItem>
            <SelectItem value="XtremeRiders">XtremeRiders</SelectItem>
            <SelectItem value="GreenWheels">GreenWheels</SelectItem>
            <SelectItem value="SpeedMax">SpeedMax</SelectItem>
            <SelectItem value="TrailBlaze">TrailBlaze</SelectItem>
          </SelectContent>
        </Select>

        {/* Category (Type) Filter */}
        <Select
          onValueChange={(value) => setFilters({ ...filters, type: value })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Road">Road</SelectItem>
            <SelectItem value="Mountain">Mountain</SelectItem>
            <SelectItem value="Hybrid">Hybrid</SelectItem>
            <SelectItem value="BMX">BMX</SelectItem>
            <SelectItem value="Electric">Electric</SelectItem>
          </SelectContent>
        </Select>

        {/* Availability (inStock) Filter */}
        <Select
          onValueChange={(value) => setFilters({ ...filters, inStock: value })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Products</SelectItem>
            <SelectItem value="true">In Stock</SelectItem>
            <SelectItem value="false">Out of Stock</SelectItem>
          </SelectContent>
        </Select>

        <Button
          onClick={() =>
            setFilters({ type: "all", brand: "all", inStock: "all" })
          }
        >
          Reset Filters
        </Button>
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="flex justify-center">
          <Loader2 className="w-8 h-8 text-gray-500 animate-spin" />
        </div>
      ) : error ? (
        <p className="text-red-500">
          An error occurred. Please try again later.
        </p>
      ) : data?.data?.length === 0 ? (
        <p className="text-center text-gray-500">No products found</p>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data?.data?.map((product: TProduct) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
