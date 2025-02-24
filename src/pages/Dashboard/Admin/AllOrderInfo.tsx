import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetOrdersQuery } from "@/redux/features/order/order";
import { Loader2 } from "lucide-react";

export type Order = {
  _id: string;
  email: string;
  cartItems: Array<{ id: string; name: string; quantity: number }>;
  totalPrice: number;
  paymentData: { paymentIntentId: string };
  createdAt: string;
  updatedAt: string;
};

const AllOrderInfo = () => {
  // Fetch orders using RTK Query
  const { isLoading, data, error } = useGetOrdersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

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
        Error loading orders. Please try again later.
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between mb-2 space-y-2 gap-x-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
          <p className="text-muted-foreground">Here's a list of all orders!</p>
        </div>
      </div>

      <Table>
        <TableCaption>A list of all orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Payment Date</TableHead>
            <TableHead>Payment Id</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((order: Order) => (
            <TableRow key={order._id}>
              <TableCell>{order._id}</TableCell>
              <TableCell>{order.email}</TableCell>
              <TableCell>{order.totalPrice}</TableCell>
              <TableCell>{order.createdAt}</TableCell>
              <TableCell>{order.paymentData.paymentIntentId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllOrderInfo;
