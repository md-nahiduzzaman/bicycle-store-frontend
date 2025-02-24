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
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

export type Order = {
  _id: string;
  email: string;
  cartItems: Array<{ id: string; name: string; quantity: number }>;
  totalPrice: number;
  paymentData: { paymentIntentId: string };
  createdAt: string;
  updatedAt: string;
};

const MyOrderInfo = () => {
  const user = useAppSelector(selectCurrentUser);
  console.log("User:", user);
  // Get the logged-in user's email from Redux store
  // const userEmail = useSelector((state: RootState) => state.auth.user?.email);

  const userEmail = user?.email;

  // Fetch all orders
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

  // Filter orders for the logged-in user
  const userOrders = data?.data?.filter(
    (order: Order) => order.email === userEmail
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between mb-2 space-y-2 gap-x-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">My Orders</h2>
          <p className="text-muted-foreground">Here's a list of all orders.</p>
        </div>
      </div>

      {userOrders?.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-gray-500">
          No orders found.
        </div>
      ) : (
        <Table>
          <TableCaption>Your order history.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Total Price</TableHead>
              <TableHead>Payment Date</TableHead>
              <TableHead>Payment Id</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userOrders?.map((order: Order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{order.paymentData.paymentIntentId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default MyOrderInfo;
