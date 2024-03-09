"use client";

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
import React from "react";
import { Chart } from "react-google-charts";
import ListSkeleton from "./list-skeleton";

export const data = [
  ["Country", "Popularity"],
  ["Germany", 200],
  ["United States", 300],
  ["Brazil", 400],
  ["Canada", 500],
  ["France", 600],
  ["RU", 700],
];

interface GeoSalesChartProps extends React.HTMLAttributes<HTMLDivElement> {}

const GeoSalesChart = React.forwardRef<HTMLDivElement, GeoSalesChartProps>(
  ({ className, children, ...props }, ref) => {
 
    const options = {
      //   region: "002", // Africa
      //   colorAxis: { colors: ["#00853f", "black", "#e31b23"] },
      backgroundColor: "transparent",
      //   datalessRegionColor: "#f8bbd0",
      //   defaultColor: "#f5f5f5",
      // keepAspectRatio: false
    };

    return (
      <Card className={cn("col-span-3", className)} ref={ref} {...props}>
  
        <CardContent>
          <div className=" grid lg:grid-cols-7 p-3 gap-6">
            <div className="col-span-4">
              <p className="font-semibold">Revenue By Country </p>
              <p className="text-xs text-muted-foreground">Most revenue generated from Uk</p>
              <Chart
                className=""
                chartEvents={[
                  {
                    eventName: "select",
                    callback: ({ chartWrapper }) => {
                      const chart = chartWrapper.getChart();
                      const selection = chart.getSelection();
                      if (selection.length === 0) return;
                      const region = data[selection[0].row + 1];
                      console.log("Selected : " + region);
                    },
                  },
                ]}
                chartType="GeoChart"
                width="100%"
                height="300px"
                data={data}
                options={options}
              />
            </div>
            <div className="col-span-3 flex flex-col gap-3">
              <div className="flex items-center text-muted-foreground">
                <Avatar className="h-6 w-6 uppercase">
                  <AvatarImage
                    src="https://cdn.britannica.com/25/4825-004-F1975B92/Flag-United-Kingdom.jpg"
                    alt="Avatar"
                  />
                  <AvatarFallback>UK</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <small className="text-xs font-medium leading-none">
                    United King.
                  </small>
                </div>

                <Badge className="ml-auto font-medium" variant="outline">
                  <small>50000</small>
                </Badge>
              </div>

              <div className="flex items-center text-muted-foreground">
                <Avatar className="h-6 w-6 uppercase">
                  <AvatarImage
                    src="https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1200px-Flag_of_Germany.svg.png"
                    alt="Avatar"
                  />
                  <AvatarFallback>DE</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <small className="text-xs font-medium leading-none">
                    Germany
                  </small>
                </div>

                <Badge className="ml-auto font-medium" variant="outline">
                  <small>15000</small>
                </Badge>
              </div>

              <div className="flex items-center text-muted-foreground">
                <Avatar className="h-6 w-6 uppercase">
                  <AvatarImage
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Flag_of_Spain_%28Civil%29.svg/2560px-Flag_of_Spain_%28Civil%29.svg.png"
                    alt="Avatar"
                  />
                  <AvatarFallback>ES</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <small className="text-xs font-medium leading-none">
                    Spain
                  </small>
                </div>

                <Badge className="ml-auto font-medium" variant="outline">
                  <small>5200</small>
                </Badge>
              </div>

              <div className="flex items-center text-muted-foreground">
                <Avatar className="h-6 w-6 uppercase">
                  <AvatarImage
                    src="https://cdn.britannica.com/82/682-004-F0B47FCB/Flag-France.jpg"
                    alt="Avatar"
                  />
                  <AvatarFallback>FR</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <small className="text-xs font-medium leading-none">
                    France
                  </small>
                </div>

                <Badge className="ml-auto font-medium" variant="outline">
                  <small>50250</small>
                </Badge>
              </div>

              <div className="flex items-center text-muted-foreground">
                <Avatar className="h-6 w-6 uppercase">
                  <AvatarImage
                    src="https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg"
                    alt="Avatar"
                  />
                  <AvatarFallback>IT</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <small className="text-xs font-medium leading-none">
                    Italy
                  </small>
                </div>

                <Badge className="ml-auto font-medium" variant="outline">
                  <small>56600</small>
                </Badge>
              </div>

              <div className="flex items-center text-muted-foreground">
                <Avatar className="h-6 w-6 uppercase">
                  <AvatarImage
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/1280px-Flag_of_the_Netherlands.svg.png"
                    alt="Avatar"
                  />
                  <AvatarFallback>NL</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <small className="text-xs font-medium leading-none">
                    Netherlands
                  </small>
                </div>

                <Badge className="ml-auto font-medium" variant="outline">
                  <small>5005</small>
                </Badge>
              </div>

              <div className="flex items-center text-muted-foreground">
                <Avatar className="h-6 w-6 uppercase">
                  <AvatarImage
                    src="https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/640px-Flag_of_Brazil.svg.png"
                    alt="Avatar"
                  />
                  <AvatarFallback>BR</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <small className="text-xs font-medium leading-none">
                    Brazil
                  </small>
                </div>

                <Badge className="ml-auto font-medium" variant="outline">
                  <small>505870</small>
                </Badge>
              </div>

              <div className="flex items-center text-muted-foreground">
                <Avatar className="h-6 w-6 uppercase">
                  <AvatarImage
                    src="https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Flag_of_Sweden.svg/1200px-Flag_of_Sweden.svg.png"
                    alt="Avatar"
                  />
                  <AvatarFallback>SE</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <small className="text-xs font-medium leading-none">
                    Sweden
                  </small>
                </div>

                <Badge className="ml-auto font-medium" variant="outline">
                  <small>15876</small>
                </Badge>
              </div>

              <div className="flex items-center text-muted-foreground">
                <Avatar className="h-6 w-6 uppercase">
                  <AvatarImage
                    src="https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Flag_of_Poland.svg/1200px-Flag_of_Poland.svg.png"
                    alt="Avatar"
                  />
                  <AvatarFallback>PL</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <small className="text-xs font-medium leading-none">
                    Poland
                  </small>
                </div>

                <Badge className="ml-auto font-medium" variant="outline">
                  <small>15480</small>
                </Badge>
              </div>

              <div className="flex items-center text-muted-foreground">
                <Avatar className="h-6 w-6 uppercase">
                  <AvatarImage
                    src="https://www.flagpictures.com/static/flags/vector/tr.svg"
                    alt="Avatar"
                  />
                  <AvatarFallback>TR</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <small className="text-xs font-medium leading-none">
                  Turkey
                  </small>
                </div>

                <Badge className="ml-auto font-medium" variant="outline">
                  <small>15480</small>
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);

GeoSalesChart.displayName = "GeoSalesChart";

export default GeoSalesChart;
