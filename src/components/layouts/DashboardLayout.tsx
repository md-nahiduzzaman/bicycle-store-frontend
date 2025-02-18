import { Outlet } from "react-router-dom";
import MainSidebar from "../Shared/Sidebar";

const DashboardLayout = () => {
  return (
    <div>
      <div className="relative flex min-h-screen">
        <MainSidebar />
        <div className="flex-1">
          <div className="p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
