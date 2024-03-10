"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import useDimensions from "../hooks/use-dimensions";
import { Skeleton } from "./skeleton";

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
  type: "Pie" | "Area" | "Bar" | "Geo";
  render: (width: number, height: number) => React.ReactNode;
}

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ isLoading, type, render, className, children, ...props }, ref) => {
    const myDivRef = React.useRef<HTMLDivElement>(null);
    const { width, height } = useDimensions(myDivRef);
    const [readyToRender, setReadyToRender] = React.useState<boolean>(false);

    React.useEffect(() => {
      setReadyToRender(true);
    }, []);

    return (
      <div ref={myDivRef} className={cn("w-full h-full", className)} {...props}>
        {readyToRender && !isLoading ? (
          <div className="w-full">{render(width, height)}</div>
        ) : (
          <div>
            {type == "Pie" && <PieChartSkeleton height={height} />}
            {type == "Area" && <BarChartSkeleton height={height} />}
            {type == "Bar" && <BarChartSkeleton height={height} />}
            {type == "Geo" && <GeoChartSkeleton height={height} />}
          </div>
        )}
      </div>
    );
  }
);

ChartContainer.displayName = "ChartContainer";

export default ChartContainer;

const BarChartSkeleton = ({ height }: { height: number }) => {
  return (
    <div className="px-10 py-5 h-full flex items-end justify-between gap-3 overflow-hidden">
      {Array.from({ length: 18 }, () => null).map((_, index) => (
        <Skeleton
          key={index}
          className="w-[55rem] rounded"
          style={{ height: height - Math.random() * 100 - 50 }}
        />
      ))}
    </div>
  );
};

const PieChartSkeleton = ({ height }: { height: number }) => {
  return (
    <div className="relative flex justify-center items-center h-full mt-10 mr-10">
      <Skeleton
        className="w-[55rem] rounded-full"
        style={{ height: height - 60, width: height - 60 }}
      />

      <div
        className="bg-card absolute translate-x-50 translate-y-50 rounded-full"
        style={{ height: height - 110, width: height - 110 }}
      ></div>
    </div>
  );
};

const GeoChartSkeleton = ({ height }: { height: number }) => {
  return (
    <div className="py-10">
      <Skeleton className="w-full" style={{ height: height -50   }} />
    </div>
  );
};
