import { Menu, ShoppingBag } from "lucide-react";

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
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";

const Navbar = () => {
  const { totalQuantity, totalPrice } = useSelector((state: any) => state.cart);
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectCurrentUser);

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      <section className="container py-6 mx-auto">
        <div className="w-full px-6">
          <nav className="justify-between hidden lg:flex">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <img
                  src="https://shadcnblocks.com/images/block/block-1.svg"
                  className="w-8"
                  alt="logo"
                />
                <span className="text-lg font-semibold">Bicycle Store</span>
              </div>
              <div className="flex items-center">
                <a
                  className={cn(
                    "text-muted-foreground",
                    navigationMenuTriggerStyle,
                    buttonVariants({
                      variant: "ghost",
                    })
                  )}
                  href="#"
                >
                  HOME
                </a>

                <a
                  className={cn(
                    "text-muted-foreground",
                    navigationMenuTriggerStyle,
                    buttonVariants({
                      variant: "ghost",
                    })
                  )}
                  href="#"
                >
                  PRODUCTS
                </a>
                <a
                  className={cn(
                    "text-muted-foreground",
                    navigationMenuTriggerStyle,
                    buttonVariants({
                      variant: "ghost",
                    })
                  )}
                  href="#"
                >
                  ABOUT
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {user ? (
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
                    <DropdownMenuContent
                      className="w-56"
                      align="end"
                      forceMount
                    >
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">
                            shadcn
                          </p>
                          <p className="text-xs leading-none text-muted-foreground">
                            m@example.com
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>New Team</DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => dispatch(logout())}>
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div>
                  <NavLink to="/login">
                    <Button variant="outline" size="sm">
                      Log in
                    </Button>
                  </NavLink>
                </div>
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

          {/* mobile view */}
          <div className="block lg:hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-between w-full pr-4">
                <div className="flex items-center">
                  <img
                    src="https://shadcnblocks.com/images/block/block-1.svg"
                    className="w-8"
                    alt="logo"
                  />
                  <span className="text-lg font-semibold">Bicycle Store</span>
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
                        <img
                          src="https://shadcnblocks.com/images/block/block-1.svg"
                          className="w-8"
                          alt="logo"
                        />
                        <span className="text-lg font-semibold">
                          Bicycle Store
                        </span>
                      </div>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-4 mt-6 mb-6">
                    <a href="#" className="font-semibold">
                      Home
                    </a>

                    <a href="#" className="font-semibold">
                      Pricing
                    </a>
                    <a href="#" className="font-semibold">
                      Blog
                    </a>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Button variant="outline">Log in</Button>
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
