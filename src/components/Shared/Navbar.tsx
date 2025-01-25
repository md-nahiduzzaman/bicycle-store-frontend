import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  return (
    <div>
      <section className="py-4">
        <div className="container">
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
                  Home
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
                  Pricing
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
                  Blog
                </a>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Log in
              </Button>
              <Button size="sm">Sign up</Button>
            </div>
          </nav>
          <div className="block lg:hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="https://shadcnblocks.com/images/block/block-1.svg"
                  className="w-8"
                  alt="logo"
                />
                <span className="text-lg font-semibold">Bicycle Store</span>
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
                    <Button>Sign up</Button>
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
