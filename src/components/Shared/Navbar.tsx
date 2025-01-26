import { Menu, ShoppingBag, User } from "lucide-react";

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
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  return (
    <div className="">
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
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <User className="w-6 h-6 rounded-full bg-zinc-800" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Email</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div>
                <Button variant="outline" size="sm">
                  Log in
                </Button>
              </div>

              <ShoppingBag className="w-6 h-6 text-gray-700" />
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
