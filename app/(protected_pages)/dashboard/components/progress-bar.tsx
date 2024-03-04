"use client";

import React, { PureComponent } from "react";

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  percentage: number;
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ name, percentage, className, children, ...props }, ref) => {
    return (
      <div className="flex justify-between mb-1 items-center gap-3">
        <small className="text-xs font-medium text-muted-foreground dark:text-white">
          {name}
        </small>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className={`bg-primary h-2.5 rounded-full `}
            style={{ width: percentage }}
          ></div>
        </div>
        <small className="text-xs font-medium text-muted-foreground dark:text-white whitespace-nowrap">
          {percentage} %
        </small>
      </div>
    );
  }
);

ProgressBar.displayName = "ProgressBar";

export default ProgressBar;
