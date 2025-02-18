import {
  Users,
  Package,
  ShoppingCart,
  Settings,
  LogOut,
  Home,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { Button } from "@/components/ui/button"; // ✅ Button import added

const menuItems = [
  { title: "Users", icon: Users, path: "/admin/users" },
  { title: "Products", icon: Package, path: "/admin/products" },
  { title: "Orders", icon: ShoppingCart, path: "/admin/orders" },
  { title: "Settings", icon: Settings, path: "/admin/settings" },
];

const MainSidebar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="">
        <SidebarHeader className="px-4 mt-6">
          <div className="flex items-center gap-2">
            <img
              src="https://shadcnblocks.com/images/block/block-1.svg"
              className="w-8"
              alt="logo"
            />
            <span className="text-lg">Bicycle Store</span>
          </div>
        </SidebarHeader>

        <SidebarContent className="px-4 mt-6">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100"
            >
              <item.icon size={18} />
              {item.title}
            </NavLink>
          ))}
        </SidebarContent>

        <SidebarFooter className="px-4 ">
          <div>
            <NavLink
              to={"/"}
              className="flex items-center gap-2 p-2 mb-4 rounded-md hover:bg-gray-100"
            >
              <Home size={18} />
              <p>Home</p>
            </NavLink>
          </div>
          <div className="flex items-center gap-4 py-4 border-t">
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative w-8 h-8 rounded-full"
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.name || "Admin"}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email || "admin@example.com"}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link to="/admin/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/admin/billing">Billing</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/admin/settings">Settings</Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => dispatch(logout())}
                    className="text-red-600"
                  >
                    <LogOut size={16} /> Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* ✅ User Info */}
            <div className="flex flex-col">
              <span className="">{user?.name || "Admin"}</span>
              <span className="text-xs text-gray-500">
                {user?.email || "admin@example.com"}
              </span>
            </div>
          </div>
          {/* Avatar & Dropdown */}
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
};

export default MainSidebar;
