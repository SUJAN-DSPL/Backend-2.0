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
import { OrderContext } from "../context/OrderContext";
import { OrderContextType } from "@/types";
import ChartContainer from "@/components/ui/chart-container";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes";
import { motion, stagger } from "framer-motion";

interface GeoSalesChartProps extends React.HTMLAttributes<HTMLDivElement> {}

const GeoSalesChart = React.forwardRef<HTMLDivElement, GeoSalesChartProps>(
  ({ className, children, ...props }, ref) => {
    const { isLoading, overview } = React.useContext(
      OrderContext
    ) as OrderContextType;

    const { theme } = useTheme();

    console.log(theme);

    const options = {
      region: "150",
      magnifyingGlass: { enable: true, zoomFactor: 100 },
      //   colorAxis: { colors: ["#00853f", "black", "#e31b23"] },
      backgroundColor: "transparent",
      enableRegionInteractivity: true,
      width: 400,
      // height: 500,
      // forceIFrame: true,
      // sizeAxis: {minValue: 500,  maxSize: 5000}
      resolution: "GB",
      geochartVersion: 10,
      datalessRegionColor: theme == "dark" ? "#1e293b" : "white",
      //   defaultColor: "#f5f5f5",
      // keepAspectRatio: false
    };

    return (
      <Card className={cn("col-span-3", className)} ref={ref} {...props}>
        <CardContent>
          <div className=" grid grid-cols-1 lg:grid-cols-7 p-3 gap-6 relative overflow-hidden ">
            <div className="col-span-4">
              <p className="font-semibold">Revenue By Country </p>
              <p className="text-xs text-muted-foreground">
                Most revenue generated from Uk
              </p>
              <div className="h-[42vh] hidden md:block">
                <ChartContainer
                  isLoading={isLoading}
                  type="Geo"
                  render={(width, height) => {
                    return (
                      <Chart
                        className=""
                        chartType="GeoChart"
                        width={width}
                        height={height}
                        data={[
                          ["Country", "Order", "Revenue"],
                          ...overview.geo_chart_data.map((d) => [
                            d.code,
                            d.total_order,
                            d.total_revenue,
                          ]),
                        ]}
                        options={options}
                      />
                    );
                  }}
                />
              </div>
            </div>

            <div className="col-span-3 flex flex-col gap-3 md:absolute z-10 right-0 top-10">
              {!!overview.geo_chart_data.length ? (
                overview.geo_chart_data.map((charData, index) => {
                  return (
                    !!charData.total_order && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.3, x: -50 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{
                          ease: "easeInOut",
                          duration: 0.2,
                         delay: index/10 + 0.1
                        }}
                        whileHover={{ scale: 0.9 }}
                        key={charData.total_order}
                        className="flex items-center justify-between gap-5 text-muted-foreground cursor-pointer"
                      >
                        <div className="flex items-center">
                          <Avatar className="h-6 w-6 uppercase">
                            <AvatarImage
                              src={charData.image}
                              alt={charData.code}
                            />
                            <AvatarFallback>{charData.code}</AvatarFallback>
                          </Avatar>
                          <div className="ml-4 space-y-1">
                            <small className="text-xs font-medium leading-none">
                              {charData.code}
                            </small>
                          </div>
                        </div>

                        <Badge
                          className="ml-auto font-medium text-xs"
                          variant="outline"
                        >
                          <small className="whitespace-nowrap">
                            £ {charData.total_revenue.toLocaleString()}
                          </small>
                        </Badge>
                      </motion.div>
                    )
                  );
                })
              ) : (
                <div className="flex flex-col gap-2">
                  {Array.from({ length: 10 }, () => null).map((_, index) => (
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center space-x-4"
                      key={index}
                    >
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[100px]" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);

GeoSalesChart.displayName = "GeoSalesChart";

export default GeoSalesChart;
