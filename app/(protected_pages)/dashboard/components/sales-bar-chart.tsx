"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { OrderContext } from "../context/OrderContext";
import { OrderContextType } from "@/types";
import ChartContainer from "@/components/ui/chart-container";

interface SalesBarChartProps extends React.HTMLAttributes<HTMLDivElement> {}

const SalesBarChart = React.forwardRef<HTMLDivElement, SalesBarChartProps>(
  ({ className, children, ...props }, ref) => {
    const { isLoading, overview } = React.useContext(
      OrderContext
    ) as OrderContextType;

    return (
      <Card className={cn("col-span-3", className)} ref={ref} {...props}>
        <CardHeader>
          <p className="font-semibold">Order With Every Market</p>
        </CardHeader>
        <CardContent>
          <div className=" h-[48vh]">
            <ChartContainer
              isLoading={isLoading}
              type="Bar"
              render={(width, height) => {
                return (
                  <BarChart
                    width={width}
                    height={height}
                    data={overview.bar_chart_data}
                    margin={{
                      top: 20,
                      right: 10,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="UK" stackId="a" fill="#7d3ad9" />
                    <Bar dataKey="DE" stackId="a" fill="#8d4cd9" />
                    <Bar dataKey="ES" stackId="a" fill="#9d5ed9" />
                    <Bar dataKey="FR" stackId="a" fill="#ad70d9" />
                    <Bar dataKey="IT" stackId="a" fill="#bd82d9" />
                    <Bar dataKey="NL" stackId="a" fill="#cd94d9" />
                    <Bar dataKey="BR" stackId="a" fill="#dda6d9" />
                    <Bar dataKey="SE" stackId="a" fill="#eda8d9" />
                    <Bar dataKey="PL" stackId="a" fill="#fdbad9" />
                    <Bar dataKey="TR" stackId="a" fill="#ffbfe6" />
                  </BarChart>
                );
              }}
            />
          </div>
        </CardContent>
      </Card>
    );
  }
);

SalesBarChart.displayName = "SalesBarChart";

export default SalesBarChart;
