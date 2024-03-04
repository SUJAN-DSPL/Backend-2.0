"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import ProgressBar from "./progress-bar";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
const COLORS = ["#8884d8", "#8884d8", "#8884d8", "#8884d8"];

interface SalesPieChartProps extends React.HTMLAttributes<HTMLDivElement> {}

const SalesPieChart = React.forwardRef<HTMLDivElement, SalesPieChartProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Card className={cn("col-span-3", className)} ref={ref} {...props}>
        <CardHeader>
          <p className="font-semibold">Market Comparison With Pie Chart</p>
          <p className="text-xs text-muted-foreground">compare the value market wise</p>
        </CardHeader>
        <CardContent className="grid grid-cols-6">
          <div className="col-span-3">
            <PieChart width={800} height={280}>
              <Pie
                data={data}
                cx={120}
                cy={130}
                innerRadius={100}
                outerRadius={120}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </div>

          <div className="col-span-3 flex flex-col gap-1 justify-center">
            <div>
              <p className="mb-3">Market percentage revenue</p>
            </div>
            <ProgressBar name="UK" percentage={100}/>
            <ProgressBar name="DE" percentage={35}/>
            <ProgressBar name="PE" percentage={30}/>
            <ProgressBar name="DE" percentage={35}/>
            <ProgressBar name="DE" percentage={35}/>
            <ProgressBar name="DE" percentage={35}/>
            <ProgressBar name="DE" percentage={35}/>
            <ProgressBar name="DE" percentage={35}/>
            <ProgressBar name="Pl" percentage={10}/>
            <ProgressBar name="TR" percentage={5}/>
          </div>
        </CardContent>
      </Card>
    );
  }
);

SalesPieChart.displayName = "SalesPieChart";

export default SalesPieChart;
