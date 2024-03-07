"use client";

import { ServerTypes } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { Chart } from "react-google-charts";
import ListSkeleton from "./list-skeleton";

import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    revenue: 4000,
    unit_sales: 2400,
  },
  {
    name: "Feb",
    revenue: 4000,
    unit_sales: 2400,
  },
  {
    name: "March",
    revenue: 3000,
    unit_sales: 1398,
  },
  {
    name: "April",
    revenue: 2000,
    unit_sales: 9800,
  },
  {
    name: "May",
    revenue: 2780,
    unit_sales: 3908,
  },
  {
    name: "June",
    revenue: 1890,
    unit_sales: 4800,
  },
  {
    name: "July",
    revenue: 2390,
    unit_sales: 3800,
  },
  {
    name: "Aug",
    revenue: 3490,
    unit_sales: 4300,
  },
  {
    name: "Sep",
    revenue: 1890,
    unit_sales: 4800,
  },
  {
    name: "Oct",
    revenue: 2390,
    unit_sales: 3800,
  },
  {
    name: "Nov",
    revenue: 3490,
    unit_sales: 4300,
  },
  {
    name: "Dec",
    revenue: 1890,
    unit_sales: 4800,
  },
];

interface SalesAreaChartProps extends React.HTMLAttributes<HTMLDivElement> {}

const SalesAreaChart = React.forwardRef<HTMLDivElement, SalesAreaChartProps>(
  ({ className, children, ...props }, ref) => {
    const cronLogQuery = useQuery({
      queryKey: [`server`],
      queryFn: async () => null,
      refetchInterval: 5000,
    }) as UseQueryResult<[]>;

    return (
      <Card className={cn("col-span-3", className)} ref={ref} {...props}>
        <CardHeader className="">
          <p className="font-semibold">Revenue With Product Chart</p>
          {/* <p className="text-sm text-muted-foreground">20 % more Revenue than Previous Month</p> */}
        </CardHeader>
        <CardContent>
          <div className="">
            {/* <ResponsiveContainer width="100%" height="100%"> */}
            <LineChart
              width={800}
              height={292}
              data={data}
              margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="unit_sales"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
            </LineChart>
            {/* </ResponsiveContainer> */}
          </div>
        </CardContent>
      </Card>
    );
  }
);

SalesAreaChart.displayName = "SalesAreaChart";

export default SalesAreaChart;
