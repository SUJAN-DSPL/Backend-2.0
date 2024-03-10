import React from "react";
import SalesDetails from "./components/sales-details";
import GeoSalesChart from "./components/geo-sales-chart";
import SalesAreaChart from "./components/sales-area-chart";
import PpcWithProduct from "./components/ppc-with-product";
import SalesBarChart from "./components/sales-bar-chart";
import SalesPieChart from "./components/sales-pie-chart";
import OrderContextProvider from "./context/OrderContext";
import YearSelector from "./components/year-selector";
import BottomToUpTransaction from "@/components/ui/bottom-to-up-transition";

const Page = () => {
  return (
    <OrderContextProvider>
      <div className="flex-1 flex flex-col gap-3 p-5 fixed top-14 md:top-1 z-50 right-11">
        <YearSelector />
      </div>
      <BottomToUpTransaction>
        <div className="relative">
          <div className=" grid grid-cols-1 lg:grid-cols-5 gap-4 mt-8 md:mt-0">
            <div className="col-span-3 flex flex-col gap-4">
              <SalesDetails />
              <SalesAreaChart />
            </div>

            <div className="col-span-2 flex flex-col gap-3">
              <GeoSalesChart />
              <PpcWithProduct />
            </div>
          </div>

          <div className=" grid grid-cols-1 lg:grid-cols-6 gap-4 mt-4">
            <div className="col-span-3 flex flex-col">
              <SalesPieChart />
            </div>

            <div className="col-span-3 flex flex-col gap-3">
              <SalesBarChart />
            </div>
          </div>
        </div>
      </BottomToUpTransaction>
    </OrderContextProvider>
  );
};

export default Page;
