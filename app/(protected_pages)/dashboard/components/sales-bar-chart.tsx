"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
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
    Uk: 10000,
    DE: 9000,
    ES: 8000,
    FR: 7000,
    It: 6000,
    NL: 5000,
    BR: 4000,
    SE: 3000,
    PL: 2000,
    TR: 1000,
  },
  {
    name: "Feb",
    Uk: 10000,
    DE: 9000,
    ES: 8000,
    FR: 7000,
    It: 6000,
    NL: 5000,
    BR: 4000,
    SE: 3000,
    PL: 2000,
    TR: 1000,
  },
  {
    name: "March",
    Uk: 10000,
    DE: 9000,
    ES: 8000,
    FR: 7000,
    It: 6000,
    NL: 5000,
    BR: 4000,
    SE: 3000,
    PL: 2000,
    TR: 1000,
  },
  {
    name: "April",
    Uk: 10000,
    DE: 9000,
    ES: 8000,
    FR: 7000,
    It: 6000,
    NL: 5000,
    BR: 4000,
    SE: 3000,
    PL: 2000,
    TR: 1000,
  },
  {
    name: "May",
    Uk: 10000,
    DE: 9000,
    ES: 8000,
    FR: 7000,
    It: 6000,
    NL: 5000,
    BR: 4000,
    SE: 3000,
    PL: 2000,
    TR: 1000,
  },
  {
    name: "June",
    Uk: 10000,
    DE: 9000,
    ES: 8000,
    FR: 7000,
    It: 6000,
    NL: 5000,
    BR: 4000,
    SE: 3000,
    PL: 2000,
    TR: 1000,
  },
  {
    name: "July",
    Uk: 100000,
    DE: 9000,
    ES: 8000,
    FR: 7000,
    It: 6000,
    NL: 5000,
    BR: 4000,
    SE: 3000,
    PL: 2000,
    TR: 1000,
  },
  {
    name: "Aug",
    Uk: 10000,
    DE: 9000,
    ES: 8000,
    FR: 7000,
    It: 6000,
    NL: 50600,
    BR: 4000,
    SE: 3000,
    PL: 2000,
    TR: 1000,
  },
  {
    name: "Sep",
    Uk: 10000,
    DE: 9000,
    ES: 8000,
    FR: 7000,
    It: 6000,
    NL: 5000,
    BR: 4000,
    SE: 3000,
    PL: 2000,
    TR: 1000,
  },
  {
    name: "Oct",
    Uk: 10000,
    DE: 9000,
    ES: 8000,
    FR: 7000,
    It: 6000,
    NL: 5000,
    BR: 40500,
    SE: 3000,
    PL: 2000,
    TR: 1000,
  },
  {
    name: "Nov",
    Uk: 10000,
    DE: 9000,
    ES: 8000,
    FR: 7000,
    It: 6000,
    NL: 5000,
    BR: 4000,
    SE: 3000,
    PL: 2000,
    TR: 1000,
  },
  {
    name: "Dec",
    Uk: 10000,
    DE: 9000,
    ES: 8000,
    FR: 7000,
    It: 6500,
    NL: 5000,
    BR: 4900,
    SE: 3090,
    PL: 2800,
    TR: 8000,
  },
];

interface SalesBarChartProps extends React.HTMLAttributes<HTMLDivElement> {}

const SalesBarChart = React.forwardRef<HTMLDivElement, SalesBarChartProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Card className={cn("col-span-3", className)} ref={ref} {...props}>
        <CardHeader>
          <p className="font-semibold">Market revenue Comparison</p>
        </CardHeader>
        <CardContent>
          <div className="">
            <BarChart
              width={670}
              height={300}
              data={data}
              margin={{
                top: 20,
                right: 10,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="UK" stackId="a" fill="#8884d8" />
              <Bar dataKey="DE" stackId="a" fill="#a2a1c0" />
              <Bar dataKey="ES" stackId="a" fill="#9492c4" />
              <Bar dataKey="FR" stackId="a" fill="#8885cf" />
              <Bar dataKey="IT" stackId="a" fill="#7572b8" />
              <Bar dataKey="NL" stackId="a" fill="#625fa8" />
              <Bar dataKey="BR" stackId="a" fill="#726ec7" />
              <Bar dataKey="SE" stackId="a" fill="#8a86d8" />
              <Bar dataKey="PL" stackId="a" fill="#928def" />
              <Bar dataKey="TR" stackId="a" fill="#8884d8" />
            </BarChart>
          </div>
        </CardContent>
      </Card>
    );
  }
);

SalesBarChart.displayName = "SalesBarChart";

export default SalesBarChart;
