"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { FaChartPie } from "react-icons/fa";
import CardSkeleton from "./card-skeleton";
import axios from "axios";
import { ServerTypes } from "@/app/types";
import { FaBox } from "react-icons/fa";
import { PiChartLineUp } from "react-icons/pi";
import { PiChartLineDown } from "react-icons/pi";
import { GiMoneyStack } from "react-icons/gi";
import { RiMoneyPoundCircleFill } from "react-icons/ri";

interface SalesDetailsProps extends React.HTMLAttributes<HTMLDivElement> {}

const SalesDetails = React.forwardRef<HTMLDivElement, SalesDetailsProps>(
  ({ className, children, ...props }, ref) => {
    const serverQuery = useQuery({
      queryKey: [`server`],
      queryFn: async () => null,
      refetchInterval: 5000,
    }) as UseQueryResult<ServerTypes>;

    return (
      <div
        className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-3", className)}
        ref={ref}
        {...props}
      >
        {serverQuery.isLoading ? (
          <CardSkeleton />
        ) : (
          <Card className=" border-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Orders
              </CardTitle>
              <FaBox className="text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex flex-col ">
              <div className="text-2xl font-bold flex items-center gap-2">
                <span>2500000</span>
                <span className="text-green-400 flex text-sm items-center gap-2">
                  + 20 % <PiChartLineUp className=" " size={25} />
                </span>
              </div>

              <p
                className={`text-xs text-muted-foreground ${
                  serverQuery.data?.server?.memory_status == "critical" &&
                  "text-red-400"
                }`}
              >
                more orders than prev month
              </p>
            </CardContent>
          </Card>
        )}

        {serverQuery.isLoading ? (
          <CardSkeleton />
        ) : (
          <Card className=" border-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <RiMoneyPoundCircleFill size={25} className="text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex flex-col ">
              <div className="text-2xl font-bold flex items-center gap-2">
                <span>25000000</span>
                <span className="text-red-400 flex text-sm items-center gap-2">
                  - 10 % <PiChartLineDown className=" " size={25} />
                </span>
              </div>

              <p
                className={`text-xs text-muted-foreground ${
                  serverQuery.data?.server?.memory_status == "critical" &&
                  "text-red-400"
                }`}
              >
                more orders than prev month
              </p>
            </CardContent>
          </Card>
        )}

{serverQuery.isLoading ? (
          <CardSkeleton />
        ) : (
          <Card className=" border-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Gross Profit
              </CardTitle>
              <FaChartPie size={22} className="text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex flex-col ">
              <div className="text-2xl font-bold flex items-center gap-2">
                <span>1500000</span>
                <span className="text-green-400 flex text-sm items-center gap-2">
                  + 5 % <PiChartLineUp className=" " size={25} />
                </span>
              </div>

              <p
                className={`text-xs text-muted-foreground ${
                  serverQuery.data?.server?.memory_status == "critical" &&
                  "text-red-400"
                }`}
              >
                more orders than prev month
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }
);

SalesDetails.displayName = "SalesDetails";

export default SalesDetails;
