"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React, { PureComponent } from "react";
import { PieChart, Pie, Tooltip } from "recharts";
import ProgressBar from "./progress-bar";
import { OrderContext } from "../context/OrderContext";
import { OrderContextType } from "@/types";
import ChartContainer from "@/components/ui/chart-container";
import { arraySum } from "@/helpers";
import { Skeleton } from "@/components/ui/skeleton";

interface SalesPieChartProps extends React.HTMLAttributes<HTMLDivElement> {}

const SalesPieChart = React.forwardRef<HTMLDivElement, SalesPieChartProps>(
  ({ className, children, ...props }, ref) => {
    const { isLoading, overview } = React.useContext(
      OrderContext
    ) as OrderContextType;

    return (
      <Card className={cn("col-span-3", className)} ref={ref} {...props}>
        <CardHeader>
          <p className="font-semibold">Market Comparison With Pie Chart</p>
          <p className="text-xs text-muted-foreground">
            compare the market statistics
          </p>
        </CardHeader>
        <CardContent className="grid grid-cols-6">
          <div className="col-span-3 h-[45vh]">
            <ChartContainer
              isLoading={isLoading}
              type="Pie"
              render={(width, height) => {
                return (
                  <PieChart width={width} height={height}>
                    <Pie
                      data={overview.pie_chart_data.map((d) => {
                        return { name: d.country, total_order: d.total_order };
                      })}
                      cx={130}
                      cy={150}
                      innerRadius={100}
                      outerRadius={120}
                      fill="#7d3ad9"
                      paddingAngle={5}
                      dataKey="total_order"
                    ></Pie>
                    <Tooltip />
                  </PieChart>
                );
              }}
            ></ChartContainer>
          </div>

          <div className="col-span-3 flex flex-col gap-1 justify-center">
            <div>
              <p className="mb-3">Market Statistics</p>
            </div>
            {!!overview.pie_chart_data.length ? (
              overview.pie_chart_data.map((data, index) => (
                <ProgressBar
                  key={index}
                  name={data.country}
                  percentage={Math.fround(
                    (data.total_order /
                      arraySum(
                        overview.pie_chart_data.map((d) => d.total_order)
                      )) *
                      100
                  )}
                />
              ))
            ) : (
              <div className="flex flex-col gap-2">
                {Array.from({ length: 10 }, () => null).map((_, index) => (
                  <div className="flex justify-between gap-2" key={index}>
                    <Skeleton className="h-4 w-14" />
                    <Skeleton className="h-4 flex-1" />
                    <Skeleton className="h-4 w-14" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
);

SalesPieChart.displayName = "SalesPieChart";

export default SalesPieChart;
