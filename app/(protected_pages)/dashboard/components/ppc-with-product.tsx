"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CardSkeleton from "./card-skeleton";

import { FaBoxes } from "react-icons/fa";
import { PiChartLineDown, PiChartLineUp } from "react-icons/pi";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { OrderContext } from "../context/OrderContext";
import { OrderContextType } from "@/types";
import LeftToRightTransaction from "@/components/ui/left-to-right-transition";
import { abbreviateNumber } from "js-abbreviation-number";

interface PpcWithProductProps extends React.HTMLAttributes<HTMLDivElement> {}

const PpcWithProduct = React.forwardRef<HTMLDivElement, PpcWithProductProps>(
  ({ className, children, ...props }, ref) => {
    const { isLoading, overview, year } = React.useContext(
      OrderContext
    ) as OrderContextType;

    return (
      <div
        className={cn("grid gap-4 md:grid-cols-2", className)}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <CardSkeleton />
        ) : (
          <Card className=" border-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total PPC Cost
              </CardTitle>
              <FaMoneyCheckAlt size={22} className="text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex flex-col ">
              <LeftToRightTransaction
                key={overview.ppc_cost.total_ppc_cost.toLocaleString()}
                className="text-2xl font-semibold flex items-center gap-2 whitespace-nowrap"
              >
                <span>
                  <span className=" text-muted-foreground font-medium">£</span>{" "}
                  {abbreviateNumber(overview.ppc_cost.total_ppc_cost, 2)}
                </span>

                {overview.ppc_cost.growth_percentage > 0 ? (
                  <span className="text-green-400 flex text-sm items-center gap-2">
                    + {Math.floor(overview.ppc_cost.growth_percentage)} %{" "}
                    <PiChartLineUp className=" " size={25} />
                  </span>
                ) : (
                  <div className="text-2xl font-semibold flex items-center gap-2">
                    <span className="text-red-400 flex text-sm items-center gap-2">
                      - {Math.floor(overview.ppc_cost.growth_percentage)} %{" "}
                      <PiChartLineDown className=" " size={25} />
                    </span>
                  </div>
                )}
              </LeftToRightTransaction>

              <p className={`text-xs text-muted-foreground`}>
                {year - 1} ppc cost was £{" "}
                {abbreviateNumber(overview.ppc_cost.prev_total_ppc_cost, 2)}
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
                Total Unit Sold
              </CardTitle>
              <FaBoxes size={22} className="text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex flex-col ">
              <LeftToRightTransaction
                key={overview.product_quantity.total_product_quantity.toLocaleString()}
                className="text-2xl font-semibold flex items-center gap-2"
              >
                <span>
                  {abbreviateNumber(
                    overview.product_quantity.total_product_quantity,
                    2
                  )}
                </span>

                {overview.product_quantity.growth_percentage > 0 ? (
                  <span className="text-green-400 flex text-sm items-center gap-2">
                    + {Math.floor(overview.product_quantity.growth_percentage)}{" "}
                    % <PiChartLineUp className=" " size={25} />
                  </span>
                ) : (
                  <div className="text-2xl font-semibold flex items-center gap-2">
                    <span className="text-red-400 flex text-sm items-center gap-2">
                      -{" "}
                      {Math.floor(overview.product_quantity.growth_percentage)}{" "}
                      % <PiChartLineDown className=" " size={25} />
                    </span>
                  </div>
                )}
              </LeftToRightTransaction>

              <p className={`text-xs text-muted-foreground`}>
                {year - 1} total unit sold was{" "}
                {abbreviateNumber(
                  overview.product_quantity.prev_total_product_quantity,
                  2
                )}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }
);

PpcWithProduct.displayName = "PpcWithProduct";

export default PpcWithProduct;
