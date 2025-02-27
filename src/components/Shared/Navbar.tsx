/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bike, LogOut, Menu, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";

const Navbar = () => {
  const { totalQuantity, totalPrice } = useSelector((state: any) => state.cart);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      <section className="container py-6 mx-auto">
        <div className="w-full px-6">
          <nav className="justify-between hidden lg:flex">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Bike
                  size={28}
                  className="p-1 text-white rounded-lg bg-slate-900"
                />
                <span className="text-xl font-black">Spinzo</span>
              </div>

              {/* Navigation Links */}
              <div className="flex items-center">
                {["/", "/products", "/about"].map((path, index) => {
                  const labels = ["HOME", "ALL BICYCLE", "ABOUT"];
                  return (
                    <NavLink
                      key={path}
                      to={path}
                      className={({ isActive }) =>
                        cn(
                          "text-muted-foreground px-3 py-2",
                          navigationMenuTriggerStyle,
                          buttonVariants({ variant: "ghost" }),
                          isActive
                            ? "text-gray-800 border-b-2 border-gray-800 rounded-none"
                            : ""
                        )
                      }
                    >
                      {labels[index]}
                    </NavLink>
                  );
                })}
              </div>
            </div>

            {/* User Section */}
            <div className="flex items-center gap-2">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative w-8 h-8 rounded-full"
                    >
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
                          {user.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <NavLink to="/dashboard">Dashboard</NavLink>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-red-600"
                    >
                      <LogOut size={16} /> Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <NavLink to="/login">
                  <Button variant="outline" size="sm">
                    Log in
                  </Button>
                </NavLink>
              )}

              {/* Cart Icon with Badge */}
              <div className="relative flex items-center">
                <Link to="/cart">
                  <ShoppingBag className="w-6 h-6 text-gray-700" />
                  {totalQuantity > 0 && (
                    <span className="absolute -top-2 -right-3 px-2 py-0.5 text-xs font-bold text-white bg-red-500 rounded-full font-number">
                      {totalQuantity}
                    </span>
                  )}
                </Link>
              </div>
              <span className="ml-4 text-lg font-semibold text-gray-700 font-number">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </nav>

          {/* Mobile Navigation */}
          <div className="block lg:hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-between w-full pr-4">
                <div className="flex items-center">
                  <Bike
                    size={28}
                    className="p-1 text-white rounded-lg bg-slate-900"
                  />
                  <span className="text-lg font-semibold">Spinzo</span>
                </div>
                <ShoppingBag className="w-6 h-6 text-gray-700" />
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="size-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>
                      <div className="flex items-center gap-2">
                        <Bike
                          size={28}
                          className="p-1 text-white rounded-lg bg-slate-900"
                        />
                        <span className="text-lg font-semibold">Spinzo</span>
                      </div>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-4 mt-6 mb-6">
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        `font-semibold ${
                          isActive ? "text-primary font-bold" : ""
                        }`
                      }
                    >
                      Home
                    </NavLink>
                    <NavLink
                      to="/products"
                      className={({ isActive }) =>
                        `font-semibold ${
                          isActive ? "text-primary font-bold" : ""
                        }`
                      }
                    >
                      All Bicycles
                    </NavLink>
                    <NavLink
                      to="/about"
                      className={({ isActive }) =>
                        `font-semibold ${
                          isActive ? "text-primary font-bold" : ""
                        }`
                      }
                    >
                      About
                    </NavLink>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      {user ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="relative w-8 h-8 rounded-full"
                            >
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
                          <DropdownMenuContent
                            className="w-56"
                            align="end"
                            forceMount
                          >
                            <DropdownMenuLabel className="font-normal">
                              <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">
                                  {user.name}
                                </p>
                                <p className="text-xs leading-none text-muted-foreground">
                                  {user.email}
                                </p>
                              </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                              <DropdownMenuItem>
                                <NavLink to="/dashboard">Dashboard</NavLink>
                              </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={handleLogout}
                              className="text-red-600"
                            >
                              <LogOut size={16} /> Log out
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ) : (
                        <NavLink to="/login">
                          <Button variant="outline" size="sm">
                            Log in
                          </Button>
                        </NavLink>
                      )}

                      {/* Cart Icon with Badge */}
                      <div className="relative flex items-center">
                        <Link to="/cart">
                          <ShoppingBag className="w-6 h-6 text-gray-700" />
                          {totalQuantity > 0 && (
                            <span className="absolute -top-2 -right-3 px-2 py-0.5 text-xs font-bold text-white bg-red-500 rounded-full font-number">
                              {totalQuantity}
                            </span>
                          )}
                        </Link>
                      </div>
                      <span className="ml-4 text-lg font-semibold text-gray-700 font-number">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Navbar;
