"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { FaChartPie } from "react-icons/fa";
import CardSkeleton from "./card-skeleton";
import axios from "axios";
import { ServerTypes } from "@/types";
import { FaBoxes } from "react-icons/fa";
import { PiChartLineUp } from "react-icons/pi";
import { FaMoneyCheckAlt } from "react-icons/fa";

interface ProfitOverviewProps extends React.HTMLAttributes<HTMLDivElement> {}

const ProfitOverview = React.forwardRef<HTMLDivElement, ProfitOverviewProps>(
  ({ className, children, ...props }, ref) => {
    const serverQuery = useQuery({
      queryKey: [`server`],
      queryFn: async () => null,
      refetchInterval: 5000,
    }) as UseQueryResult<ServerTypes>;

    return (
      <div
        className={cn("grid gap-4 md:grid-cols-2", className)}
        ref={ref}
        {...props}
      >
        {serverQuery.isLoading ? (
          <CardSkeleton />
        ) : (
          <Card className=" border-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <FaMoneyCheckAlt size={22} className="text-muted-foreground" />
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
                Total Unit Product
              </CardTitle>
              <FaBoxes size={22} className="text-muted-foreground" />
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
      </div>
    );
  }
);

ProfitOverview.displayName = "ProfitOverview";

export default ProfitOverview;
