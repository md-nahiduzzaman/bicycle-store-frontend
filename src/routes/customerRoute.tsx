import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { Loader2 } from "lucide-react";

const CustomerRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector(selectCurrentUser);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      </div>
    );
  }

  return user.role === "customer" ? children : <Navigate to="/dashboard" />;
};

export default CustomerRoute;
