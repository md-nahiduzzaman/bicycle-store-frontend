import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/redux/features/product/product";

// Product type definition
export type Product = {
  _id: string;
  name: string;
  brand: string;
  img: string;
  price: number;
  type: "Mountain" | "Road" | "Hybrid" | "BMX" | "Electric";
  description: string;
  quantity: number;
  inStock: boolean;
};

// Form Schema using Zod for validation
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").optional(),
  brand: z.string().min(2, "Brand name is required.").optional(),
  img: z.string().url("Image URL must be valid").optional(),
  price: z.coerce.number().min(1, "Price must be at least 1."),
  type: z.enum(["Mountain", "Road", "Hybrid", "BMX", "Electric"]).optional(),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters.")
    .optional(),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1."),
  inStock: z.boolean().optional(),
});

type FormData = z.infer<typeof formSchema>;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetProductByIdQuery(id);
  const productData = data?.data;

  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [imageUrl, setImageUrl] = useState("");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: productData?.name || "",
      brand: productData?.brand || "",
      img: productData?.img || "",
      price: productData?.price || 0,
      type: productData?.type || "Mountain",
      description: productData?.description || "",
      quantity: productData?.quantity || 0,
      inStock: productData?.inStock !== undefined ? productData?.inStock : true,
    },
  });

  useEffect(() => {
    if (productData?.data) {
      const product = productData.data;
      form.reset({
        name: product.name || "",
        brand: product.brand || "",
        img: product.img || "",
        price: product.price || 0,
        type: product.type || "Mountain",
        description: product.description || "",
        quantity: product.quantity || 0,
        inStock: product.inStock !== undefined ? product.inStock : true,
      });
      setImageUrl(product.img);
    }
  }, [productData, form]);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      );
      const uploadedImageUrl = data.data.display_url;
      setImageUrl(uploadedImageUrl);
      form.setValue("img", uploadedImageUrl); // Set image URL in the form
    } catch (error) {
      console.error("Image upload failed", error);
      toast.error("Image upload failed. Please try again.");
    }
  };

  const onSubmit = async (values: FormData) => {
    try {
      await updateProduct({ id, ...values }).unwrap();
      toast.success("Product updated successfully!");
      navigate("/dashboard/products");
    } catch (error) {
      console.error("Update Error:", error);
      toast.error("Failed to update product. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Error loading product. Please try again later.
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Update Product</h2>
        <p className="text-muted-foreground">
          Update your product information below
        </p>
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter product name"
                      {...field}
                      value={field.value || productData?.name || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Brand Name"
                      {...field}
                      value={field.value || productData?.brand || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || productData?.type || "Mountain"}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                      <SelectContent>
                        {["Mountain", "Road", "Hybrid", "BMX", "Electric"].map(
                          (type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Product Description"
                      {...field}
                      value={field.value || productData?.description || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Product Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </FormControl>
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Product preview"
                  className="object-cover w-20 h-20 mt-2 rounded"
                />
              )}
            </FormItem>

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Price"
                      {...field}
                      value={field.value || productData?.price || 0}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Quantity"
                      {...field}
                      value={field.value || productData?.quantity || 0}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isUpdating}>
              {isUpdating && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Update Product
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateProduct;
