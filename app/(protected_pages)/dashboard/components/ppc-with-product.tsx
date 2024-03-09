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
              <div className="text-2xl font-bold flex items-center gap-2">
                <span>{Math.floor(overview.ppc_cost.total_ppc_cost)}</span>

                {overview.ppc_cost.growth_percentage > 0 ? (
                  <span className="text-green-400 flex text-sm items-center gap-2">
                    + {Math.floor(overview.ppc_cost.growth_percentage)} %{" "}
                    <PiChartLineUp className=" " size={25} />
                  </span>
                ) : (
                  <div className="text-2xl font-bold flex items-center gap-2">
                    <span className="text-red-400 flex text-sm items-center gap-2">
                      - {Math.floor(overview.ppc_cost.growth_percentage)} %{" "}
                      <PiChartLineDown className=" " size={25} />
                    </span>
                  </div>
                )}
              </div>

              <p className={`text-xs text-muted-foreground`}>
                {year - 1} ppc cost was {Math.floor(overview.ppc_cost.prev_total_ppc_cost)}
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
              <div className="text-2xl font-bold flex items-center gap-2">
                <span>{overview.product_quantity.total_product_quantity}</span>

                {overview.product_quantity.growth_percentage > 0 ? (
                  <span className="text-green-400 flex text-sm items-center gap-2">
                    + {Math.floor(overview.product_quantity.growth_percentage)}{" "}
                    % <PiChartLineUp className=" " size={25} />
                  </span>
                ) : (
                  <div className="text-2xl font-bold flex items-center gap-2">
                    <span className="text-red-400 flex text-sm items-center gap-2">
                      -{" "}
                      {Math.floor(overview.product_quantity.growth_percentage)}{" "}
                      % <PiChartLineDown className=" " size={25} />
                    </span>
                  </div>
                )}
              </div>

              <p className={`text-xs text-muted-foreground`}>
                {year - 1} total unit sold was{" "}
                {overview.product_quantity.prev_total_product_quantity}
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
