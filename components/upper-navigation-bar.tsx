"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button, buttonVariants } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { FC } from "react";
import React from "react";
import ThemeToggler from "./ui/theme-toggler";
import Link from "next/link";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

import { OrderContextType } from "@/types";
import { OrderContext } from "@/app/(protected_pages)/dashboard/context/OrderContext";
import YearSelector from "@/app/(protected_pages)/dashboard/components/year-selector";

interface UpperNavigationBarProps {}

const UpperNavigationBar: FC<UpperNavigationBarProps> = () => {
  // const d = React.useContext(OrderContext) as OrderContextType;
  // console.log(d,"hello")

  return (
    <header
      className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full 
        bg-background/95 backdrop-blur md:px-5"
    >
      <div className=" flex h-20 items-center justify-between selection">
        <div className="text-xl md:text-2xl font-semibold">
          <div className="font-semibold text-2xl mb-1 flex items-center gap-5">
            {" "}
            <ProfileDropDown />{" "}
            <div>
              <p>Good Morning, Sujan</p>
              <p className=" font-semibold text-xs text-muted-foreground">
                Market has been{" "}
                <span className=" text-secondary-foreground">growing</span> in
                Volume of{" "}
                <span className=" text-secondary-foreground">30%</span>
              </p>
            </div>
          </div>
        </div>
        <div className=" flex items-center gap-2">
          {/* <Input type="text" className="w-80" placeholder="search..." /> */}
          {/* <YearSelector /> */}
          <ThemeToggler />
        </div>
      </div>
    </header>
  );
};

export default UpperNavigationBar;

const ProfileDropDown = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, title, children, ...props }, ref) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="p-1 border rounded-md mt-2 cursor-pointer w-28"
      >
        <DropdownMenuItem className="relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer">
          <Link href="">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer">
          <Link href="">Logout</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

ProfileDropDown.displayName = "ProfileDropDown";
