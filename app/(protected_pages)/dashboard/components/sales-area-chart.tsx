"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { OrderContext } from "../context/OrderContext";
import { OrderContextType } from "@/types";
import ChartContainer from "@/components/ui/chart-container";

interface SalesAreaChartProps extends React.HTMLAttributes<HTMLDivElement> {}

const SalesAreaChart = React.forwardRef<HTMLDivElement, SalesAreaChartProps>(
  ({ className, children, ...props }, ref) => {
    const { isLoading, overview } = React.useContext(
      OrderContext
    ) as OrderContextType;

    return (
      <Card className={cn("col-span-3", className)} ref={ref} {...props}>
        <CardHeader className="">
          <p className=" text-sm md:text-base font-semibold md:font-semibold">
            Revenue With Unit Sales & PPC Cost
          </p>
        </CardHeader>
        <CardContent>
          <div className=" h-[40vh]">
            <ChartContainer
              type="Area"
              isLoading={isLoading}
              render={(width, height) => {
                return (
                  <LineChart
                    width={width}
                    height={height}
                    data={overview.area_chart_data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 10,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#22c55e"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="unit_sales"
                      stroke="#6d28d9"
                    />
                    <Line type="monotone" dataKey="ppc_cost" stroke="#3b82f6" />
                  </LineChart>
                );
              }}
            />
          </div>
        </CardContent>
      </Card>
    );
  }
);

SalesAreaChart.displayName = "SalesAreaChart";

export default SalesAreaChart;
