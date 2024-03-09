"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { FaChartPie } from "react-icons/fa";
import CardSkeleton from "./card-skeleton";
import { FaBox } from "react-icons/fa";
import { PiChartLineUp } from "react-icons/pi";
import { PiChartLineDown } from "react-icons/pi";
import { RiMoneyPoundCircleFill } from "react-icons/ri";
import { OrderContext } from "../context/OrderContext";
import { OrderContextType } from "@/types";

interface SalesDetailsProps extends React.HTMLAttributes<HTMLDivElement> {}

const SalesDetails = React.forwardRef<HTMLDivElement, SalesDetailsProps>(
  ({ className, children, ...props }, ref) => {
    const { isLoading, overview, year } = React.useContext(
      OrderContext
    ) as OrderContextType;

    return (
      <div
        className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-3", className)}
        ref={ref}
        {...props}
      >
        {isLoading ? (
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
                <span>{overview.order.total_order}</span>

                {overview.order.growth_percentage > 0 ? (
                  <span className="text-green-400 flex text-sm items-center gap-2">
                    + {Math.floor(overview.order.growth_percentage)} %{" "}
                    <PiChartLineUp className=" " size={25} />
                  </span>
                ) : (
                  <div className="text-2xl font-bold flex items-center gap-2">
                    <span className="text-red-400 flex text-sm items-center gap-2">
                      - {Math.floor(overview.order.growth_percentage)} %{" "}
                      <PiChartLineDown className=" " size={25} />
                    </span>
                  </div>
                )}
              </div>

              <p className={`text-xs text-muted-foreground`}>
                {year - 1} total orders was {overview.order.prev_total_order}
              </p>
            </CardContent>
          </Card>
        )}

        {isLoading ? (
          <CardSkeleton />
        ) : (
          <Card className=" border-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <RiMoneyPoundCircleFill
                size={25}
                className="text-muted-foreground"
              />
            </CardHeader>
            <CardContent className="flex flex-col ">
              <div className="text-2xl font-bold flex items-center gap-2">
                <span>{Math.floor(overview.revenue.total_revenue)}</span>

                {overview.revenue.growth_percentage > 0 ? (
                  <span className="text-green-400 flex text-sm items-center gap-2">
                    + {Math.floor(overview.revenue.growth_percentage)} %{" "}
                    <PiChartLineUp className=" " size={25} />
                  </span>
                ) : (
                  <div className="text-2xl font-bold flex items-center gap-2">
                    <span className="text-red-400 flex text-sm items-center gap-2">
                      - {Math.floor(overview.revenue.growth_percentage)} %{" "}
                      <PiChartLineDown className=" " size={25} />
                    </span>
                  </div>
                )}
              </div>

              <p className={`text-xs text-muted-foreground`}>
                {year - 1} total revenue was{" "}
                {Math.floor(overview.revenue.prev_total_revenue)}
              </p>
            </CardContent>
          </Card>
        )}

        {isLoading ? (
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
                <span>{Math.floor(overview.profit.total_gross_profit)}</span>

                {overview.profit.growth_percentage > 0 ? (
                  <span className="text-green-400 flex text-sm items-center gap-2">
                    + {Math.floor(overview.profit.growth_percentage)} %{" "}
                    <PiChartLineUp className=" " size={25} />
                  </span>
                ) : (
                  <div className="text-2xl font-bold flex items-center gap-2">
                    <span className="text-red-400 flex text-sm items-center gap-2">
                      - {Math.floor(overview.profit.growth_percentage)} %{" "}
                      <PiChartLineDown className=" " size={25} />
                    </span>
                  </div>
                )}
              </div>

              <p className={`text-xs text-muted-foreground`}>
                {year - 1} gross profit was{" "}
                {Math.floor(overview.profit.prev_total_gross_profit)}
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
