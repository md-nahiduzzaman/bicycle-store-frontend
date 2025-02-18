import { Outlet } from "react-router-dom";
import MainSidebar from "../Shared/Sidebar";

const DashboardLayout = () => {
  return (
    <div>
      <div className="relative min-h-[calc(100vh-160px)] md:flex">
        <MainSidebar />
        <div className="flex-1 md:ml-72">
          <div className="p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
