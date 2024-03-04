"use client";

import { SideNavigationBar } from "@/components/side-navigation-bar";
import UpperNavigationBar from "@/components/upper-navigation-bar";
import { MdDashboard } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { MdInsertChartOutlined } from "react-icons/md";
import { FaUserClock } from "react-icons/fa";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="flex">
          <div className="h-screen w-10 flex flex-col gap-5 justify-center fixed p-5 text-muted-foreground">
            <MdDashboard  className=" border-2 border-primary text-primary rounded cursor-pointer" size={25}/>
            <FaUserClock className="cursor-pointer hover:text-primary" size={25}/>
            <MdInsertChartOutlined className="cursor-pointer hover:text-primary" size={25} />
            <IoIosSettings className="cursor-pointer hover:text-primary" size={25} />
          </div>

          <div className="flex-1 min-h-screen ml-10">
            <UpperNavigationBar />
            <main className="flex-1 space-y-4 p-8 pt-4">{children}</main>
          </div>
        </div>
      </div>
    </>
  );
}
