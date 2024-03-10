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
import LeftToRightTransaction from "@/components/ui/left-to-right-transition";
import { abbreviateNumber } from "js-abbreviation-number";

interface SalesDetailsProps extends React.HTMLAttributes<HTMLDivElement> {}

const SalesDetails = React.forwardRef<HTMLDivElement, SalesDetailsProps>(
  ({ className, children, ...props }, ref) => {
    const { isLoading, overview, year, updateYear } = React.useContext(
      OrderContext
    ) as OrderContextType;

    return (
      <div
        className={cn(
          "grid gap-4 grid-col-1 md:grid-cols-2 lg:grid-cols-3",
          className
        )}
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
              <LeftToRightTransaction
                key={overview.order.total_order.toLocaleString()}
                className="text-2xl font-semibold flex items-center gap-2"
              >
                <span>{abbreviateNumber(overview.order.total_order, 2)}</span>

                {overview.order.growth_percentage > 0 ? (
                  <span className="text-green-400 flex text-sm items-center gap-2">
                    + {Math.floor(overview.order.growth_percentage)} %{" "}
                    <PiChartLineUp className=" " size={25} />
                  </span>
                ) : (
                  <div className="text-2xl font-semibold flex items-center gap-2">
                    <span className="text-red-400 flex text-sm items-center gap-2">
                      - {Math.floor(overview.order.growth_percentage)} %{" "}
                      <PiChartLineDown className=" " size={25} />
                    </span>
                  </div>
                )}
              </LeftToRightTransaction>

              <p className={`text-xs text-muted-foreground`}>
                {year - 1} total orders was{" "}
                {abbreviateNumber(overview.order.prev_total_order, 2)}
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
              <LeftToRightTransaction
                key={overview.order.total_order.toLocaleString()}
                className="text-2xl font-semibold flex items-center gap-2 whitespace-nowrap "
              >
                <span>
                  <span className=" text-muted-foreground font-medium">£</span>{" "}
                  {abbreviateNumber(overview.revenue.total_revenue, 2)}
                </span>

                {overview.revenue.growth_percentage > 0 ? (
                  <span className="text-green-400 flex text-sm items-center gap-2">
                    + {Math.floor(overview.revenue.growth_percentage)} %{" "}
                    <PiChartLineUp className=" " size={25} />
                  </span>
                ) : (
                  <div className="text-2xl font-semibold flex items-center gap-2">
                    <span className="text-red-400 flex text-sm items-center gap-2">
                      - {Math.floor(overview.revenue.growth_percentage)} %{" "}
                      <PiChartLineDown className=" " size={25} />
                    </span>
                  </div>
                )}
              </LeftToRightTransaction>

              <p className={`text-xs text-muted-foreground`}>
                {year - 1} total revenue was £{" "}
                {abbreviateNumber(overview.revenue.prev_total_revenue, 2)}
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
              <LeftToRightTransaction
                key={overview.order.total_order.toLocaleString()}
                className="text-2xl font-semibold flex items-center gap-2 whitespace-nowrap"
              >
                <span>
                  <span className=" text-muted-foreground font-medium">£</span>{" "}
                  {abbreviateNumber(overview.profit.total_gross_profit, 2)}
                </span>

                {overview.profit.growth_percentage > 0 ? (
                  <span className="text-green-400 flex text-sm items-center gap-2">
                    + {Math.floor(overview.profit.growth_percentage)} %{" "}
                    <PiChartLineUp className=" " size={25} />
                  </span>
                ) : (
                  <div className="text-2xl font-semibold flex items-center gap-2">
                    <span className="text-red-400 flex text-sm items-center gap-2">
                      - {Math.floor(overview.profit.growth_percentage)} %{" "}
                      <PiChartLineDown className=" " size={25} />
                    </span>
                  </div>
                )}
              </LeftToRightTransaction>

              <p className={`text-xs text-muted-foreground`}>
                {year - 1} gross profit was £{" "}
                {abbreviateNumber(overview.profit.prev_total_gross_profit, 2)}
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
