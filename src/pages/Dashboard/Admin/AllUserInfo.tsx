import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  useGetUserQuery,
  useBlockUserMutation,
} from "@/redux/features/user/user";

export type User = {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "customer";
  isBlocked: boolean;
};

const AllUserInfo = () => {
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  // Fetch users using RTK Query
  const { isLoading, data, error, refetch } = useGetUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  // Block/Unblock user mutation
  const [blockUser] = useBlockUserMutation();

  // Handle Block/Unblock user
  const handleBlockToggle = async (userId: string, isBlocked: boolean) => {
    console.log(
      "Toggling block status for:",
      userId,
      "Current Status:",
      isBlocked
    );
    setIsProcessing(userId);
    try {
      // Only pass the userId to blockUser mutation
      const response = await blockUser({ userId }).unwrap();
      console.log("API Response:", response);
      toast.success(`User ${isBlocked ? "Blocked" : "Active"} successfully!`);
      refetch();
    } catch (error) {
      console.error("Operation failed", error);
      toast.error("Failed to update user status. Please try again.");
    } finally {
      setIsProcessing(null);
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
        Error loading users. Please try again later.
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between mb-2 space-y-2 gap-x-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Users</h2>
          <p className="text-muted-foreground">Here's a list of all users!</p>
        </div>
      </div>

      <Table>
        <TableCaption>A list of all users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((user: User) => (
            <TableRow key={user._id}>
              <TableCell>{user._id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <span
                  className={user.isBlocked ? "text-red-600" : "text-green-600"}
                >
                  {user.isBlocked ? "Blocked" : "Active"}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-2 text-center">
                  <Button
                    onClick={() => handleBlockToggle(user._id, user.isBlocked)}
                    disabled={isProcessing === user._id || user.isBlocked}
                  >
                    {isProcessing === user._id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : user.isBlocked ? (
                      "Blocked"
                    ) : (
                      "Block"
                    )}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllUserInfo;
