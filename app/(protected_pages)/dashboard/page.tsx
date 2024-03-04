import React from "react";
import SalesDetails from "./components/sales-details";
import GeoSalesChart from "./components/geo-sales-chart";
import SalesAreaChart from "./components/sales-area-chart";
import ProfitOverview from "./components/profit-overview";
import SalesBarChart from "./components/sales-bar-chart";
import SalesPieChart from "./components/sales-pie-chart";

const Page = () => {
  return (
    <div>
      <div className=" grid lg:grid-cols-5 gap-4">
        <div className="col-span-3 flex flex-col gap-4">
          <SalesDetails />
          <SalesAreaChart />
        </div>

        <div className="col-span-2 flex flex-col gap-3">
          <GeoSalesChart />
          <ProfitOverview />
        </div>
      </div>

      <div className=" grid lg:grid-cols-6 gap-4 mt-4">
        <div className="col-span-3 flex flex-col">
          <SalesPieChart />
        </div>

        <div className="col-span-3 flex flex-col gap-3">
          <SalesBarChart />
        </div>
      </div>
    </div>
  );
};

export default Page;
