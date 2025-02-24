import {
  Users,
  Package,
  ShoppingCart,
  LogOut,
  Home,
  ShoppingBag,
  UserRound,
  Menu,
  User,
} from "lucide-react";
import {
  Sidebar,
  SidebarFooter,
  SidebarGroupContent,
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
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";

// Admin Menu
const adminMenuItems = [
  { title: "My Profile", icon: UserRound, path: "/dashboard/profile" },
  { title: "Users", icon: Users, path: "/dashboard/admin/users" },
  { title: "Products", icon: Package, path: "/dashboard/admin/products" },
  { title: "Orders", icon: ShoppingCart, path: "/dashboard/admin/orders" },
];

// Customer Menu
const customerMenuItems = [
  { title: "My Profile", icon: UserRound, path: "/dashboard/profile" },
  { title: "My Orders", icon: ShoppingBag, path: "/dashboard/my-orders" },
];

const MainSidebar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // Close the mobile sidebar when navigating
  useEffect(() => {
    setIsOpen(false);
  }, [navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // Role-based menu selection
  const menuItems = user?.role === "admin" ? adminMenuItems : customerMenuItems;

  const SidebarContent = () => (
    <>
      <SidebarHeader className="px-4 mt-6">
        <div className="flex items-center gap-2">
          <img
            src="https://shadcnblocks.com/images/block/block-1.svg"
            className="w-8"
            alt="logo"
          />
          <span className="text-lg">Spinzo</span>
        </div>
      </SidebarHeader>

      <SidebarGroupContent className="px-4 mt-6">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md ${
                isActive ? "bg-zinc-900 text-white" : "hover:bg-gray-100"
              }`
            }
          >
            <item.icon size={18} />
            {item.title}
          </NavLink>
        ))}
      </SidebarGroupContent>

      <SidebarFooter className="px-4">
        <div>
          <NavLink
            to="/"
            className="flex items-center gap-2 p-2 mb-4 rounded-md hover:bg-gray-100"
          >
            <Home size={18} />
            <p>Home</p>
          </NavLink>
        </div>
        <div className="flex items-center gap-4 py-4 border-t">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative w-8 h-8 rounded-full">
                <Avatar className="w-8 h-8">
                  <AvatarImage>
                    <User size={32} />
                  </AvatarImage>
                  <AvatarFallback>
                    <User size={32} />
                  </AvatarFallback>
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
                  <Link to="/dashboard/profile">Profile</Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut size={16} /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex flex-col">
            <span className="">{user?.name}</span>
            <span className="text-xs text-gray-500">
              {user?.email || "admin@example.com"}
            </span>
          </div>
        </div>
      </SidebarFooter>
    </>
  );

  return (
    <>
      {/* Mobile Sidebar using Sheet component */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="fixed left-auto z-40 top-4"
            >
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex flex-col h-full">
              <SidebarContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <SidebarProvider className="hidden w-64 shrink-0 md:block">
        <Sidebar collapsible="icon">
          <SidebarContent />
        </Sidebar>
      </SidebarProvider>
    </>
  );
};

export default MainSidebar;
