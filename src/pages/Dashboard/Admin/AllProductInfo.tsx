import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Loader2, Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  useCreateProductMutation,
  useGetProductsQuery,
} from "@/redux/features/product/product";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";

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

// Form Schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  brand: z.string().min(2, "Brand name is required."),
  img: z.string().url("Image URL must be valid"),
  price: z.number().min(1, "Price must be at least 1."),
  type: z.enum(["Mountain", "Road", "Hybrid", "BMX", "Electric"]),
  description: z.string().min(5, "Description must be at least 5 characters."),
  quantity: z.number().min(1, "Quantity must be at least 1."),
  inStock: z.boolean(),
});

const AllProductInfo = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  // Fetch products using RTK Query
  const { isLoading, data, error, refetch } = useGetProductsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  console.log(data);

  // Create product mutation
  const [createProduct, { isLoading: isCreating, isError }] =
    useCreateProductMutation();

  // Form Hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      brand: "",
      img: "",
      price: 0,
      type: "Mountain",
      description: "",
      quantity: 0,
      inStock: true,
    },
  });

  // Handle Image Upload
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
      form.setValue("img", uploadedImageUrl);
    } catch (error) {
      console.error("Image upload failed", error);
      toast.error("Image upload failed. Please try again.");
    }
  };

  // Handle Form Submit
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Form submitted");
    console.log("Submitted Data:", values);

    try {
      await createProduct(values).unwrap();
      toast.success("Product added successfully!");
      setIsDialogOpen(false);
      form.reset();
      setImageUrl("");
      refetch();
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error("Failed to add product. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error loading products. Please try again later.
      </div>
    );
  }

  if (isError) {
    console.log("Mutation Error:", error);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between mb-2 space-y-2 gap-x-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your all products!
          </p>
        </div>
        <div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="space-x-1">
                <span>Add New Product</span> <Plus size={18} />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                  Enter product details below and click save.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  {/* name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Product Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* brand */}
                  <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand</FormLabel>
                        <FormControl>
                          <Input placeholder="Brand Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* type */}
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a type" />
                            </SelectTrigger>
                            <SelectContent>
                              {[
                                "Mountain",
                                "Road",
                                "Hybrid",
                                "BMX",
                                "Electric",
                              ].map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input placeholder="Product Description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Image Upload */}
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
                        alt="Uploaded preview"
                        className="w-20 mt-2"
                      />
                    )}
                  </FormItem>

                  {/* price */}
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
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* quantity */}
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
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter>
                    <Button type="submit" disabled={isLoading}>
                      {isCreating && (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      )}
                      Save Product
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        {/* Loading State */}
        {isLoading && <p>Loading products...</p>}

        {/* Error State */}
        {error && <p className="text-red-500">Failed to load products.</p>}

        <Table>
          <TableCaption>A list of your all products.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>In-Stock</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((product: Product) => (
              <TableRow key={product._id}>
                <TableCell>{product._id}</TableCell>
                <TableCell>
                  <img src={product.img} alt={product.name} className="w-16" />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>{product.type}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>
                  <span
                    className={
                      product.inStock ? "text-green-600 " : "text-red-600"
                    }
                  >
                    {product.inStock ? "Yes" : "No"}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-2 text-center">
                    <Button className="space-x-1">
                      <Link to={`/dashboard/update/${product._id}`}>
                        <span>Update Product</span> <Pencil size={18} />
                      </Link>
                    </Button>
                    <Button>Delete</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllProductInfo;
