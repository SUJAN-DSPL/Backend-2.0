"use client";

import React, { PureComponent } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrderContext } from "../context/OrderContext";
import { OrderContextType } from "@/types";

interface YearSelectorProps extends React.HTMLAttributes<HTMLDivElement> {}

const YearSelector = React.forwardRef<HTMLDivElement, YearSelectorProps>(
  ({ className, children, ...props }, ref) => {
    const { year, updateYear } = React.useContext(
      OrderContext
    ) as OrderContextType;
    return (
      <Tabs defaultValue={`${year}`} className="w-full flex justify-center items-center flex-col">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="2021" onClick={() => updateYear(2021)}>
            2021
          </TabsTrigger>
          <TabsTrigger value="2022" onClick={() => updateYear(2022)}>
            2022
          </TabsTrigger>
          <TabsTrigger value="2023" onClick={() => updateYear(2023)}>
            2023
          </TabsTrigger>
          <TabsTrigger value="2024" onClick={() => updateYear(2024)}>
            2024
          </TabsTrigger>
        </TabsList>
      </Tabs>
    );
  }
);

YearSelector.displayName = "YearSelector";

export default YearSelector;
