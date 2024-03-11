"use client";

import React, { useState } from "react";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import {
  CountryCodeType,
  OrderContextType,
  OrderOverviewType,
  OrdersReportRawDataType,
} from "@/types";
import { group } from "console";
import { arraySum, countries, groupBy, months } from "@/helpers";

export const OrderContext = React.createContext<OrderContextType | null>(null);

const OrderContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const redisKey = "order_overview_raw_data";

  const ordersRawData = useQuery({
    queryKey: [`order-report-raw-data`],
    queryFn: async () =>
      (
        await fetch(`/api/redis/get/${redisKey}`, {
          method: "GET",
          headers: {
            "access-token": "hard_secret_*****",
            "Content-Type": "application/json",
          },
        })
      ).json(),
    refetchInterval: 60000 * 5,
    initialData: { value: undefined },
  }) as UseQueryResult<OrdersReportRawDataType>;

  const [isLoading, setIsLoading] = useState(true);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [overview, setOverview] = useState<OrderOverviewType>({
    order: {
      total_order: 0,
      growth_percentage: 0,
      prev_total_order: 0,
    },
    revenue: {
      total_revenue: 0,
      growth_percentage: 0,
      prev_total_revenue: 0,
    },
    profit: {
      total_gross_profit: 0,
      growth_percentage: 0,
      prev_total_gross_profit: 0,
    },
    ppc_cost: {
      total_ppc_cost: 0,
      growth_percentage: 0,
      prev_total_ppc_cost: 0,
    },
    product_quantity: {
      total_product_quantity: 0,
      growth_percentage: 0,
      prev_total_product_quantity: 0,
    },
    geo_chart_data: [],
    area_chart_data: [],
    pie_chart_data: [],
    bar_chart_data: [],
  });

  React.useEffect(() => {
    if (!ordersRawData.data?.value) return;
    setOverview((e) => {
      return {
        order: getTotalOrder(),
        revenue: getTotalRevenue(),
        profit: getTotalGrossProfit(),
        ppc_cost: getTotalPpcCost(),
        product_quantity: getTotalProductQuantity(),
        geo_chart_data: getGeoChartData(),
        area_chart_data: getAreaChartData(),
        pie_chart_data: getPieChartData(),
        bar_chart_data: getBarChartData(),
      };
    });

    setIsLoading(false);
  }, [ordersRawData.data, year]);

  // * getter functions

  type GetToTotalOrderType = {
    total_order: number;
    growth_percentage: number;
    prev_total_order: number;
  };

  const getTotalOrder = (): GetToTotalOrderType => {
    const data = getYearData();
    const prevYearData = getPrevYearData();

    const totalOrder = arraySum(data.map((item) => item.total_orders));
    const prevTotalOrder = arraySum(
      prevYearData.map((item) => item.total_orders)
    );

    const totalOrderAvg = totalOrder / groupBy(data, "date_key").length;

    const prevTotalOrderAvg =
      prevTotalOrder / groupBy(prevYearData, "date_key").length;

    return {
      total_order: totalOrder,
      growth_percentage:
        ((totalOrderAvg - prevTotalOrderAvg) / prevTotalOrderAvg) * 100,
      prev_total_order: prevTotalOrder,
    };
  };

  type GetToTotalRevenueType = {
    total_revenue: number;
    growth_percentage: number;
    prev_total_revenue: number;
  };

  const getTotalRevenue = (): GetToTotalRevenueType => {
    const data = getYearData();
    const prevYearData = getPrevYearData();

    const totalRevenue = arraySum(
      data.map((item) => item.total_selling_amount - item.total_refund_amount)
    );
    const prevTotalRevenue = arraySum(
      prevYearData.map(
        (item) => item.total_selling_amount - item.total_refund_amount
      )
    );

    const totalRevenueAvg = totalRevenue / groupBy(data, "date_key").length;
    const prevTotalRevenueAvg =
      prevTotalRevenue / groupBy(prevYearData, "date_key").length;

    return {
      total_revenue: totalRevenue,
      growth_percentage:
        ((totalRevenueAvg - prevTotalRevenueAvg) / prevTotalRevenueAvg) * 100,
      prev_total_revenue: prevTotalRevenue,
    };
  };

  type GetToTotalGrosProfitType = {
    total_gross_profit: number;
    growth_percentage: number;
    prev_total_gross_profit: number;
  };

  const getTotalGrossProfit = (): GetToTotalGrosProfitType => {
    const data = getYearData();
    const prevYearData = getPrevYearData();

    const totalGrossProfit = arraySum(
      data.map(
        (item) =>
          item.total_selling_amount -
          (item.total_refund_amount +
            item.total_ppc_fee +
            item.total_shipping_cost +
            item.total_cost_price)
      )
    );

    const prevTotalGrossProfit = arraySum(
      prevYearData.map(
        (item) =>
          item.total_selling_amount -
          (item.total_refund_amount +
            item.total_ppc_fee +
            item.total_shipping_cost +
            item.total_cost_price)
      )
    );

    const totalGrossProfitAvg =
      totalGrossProfit / groupBy(data, "date_key").length;

    const prevTotalRevenueAvg =
      prevTotalGrossProfit / groupBy(prevYearData, "date_key").length;

    return {
      total_gross_profit: totalGrossProfit,
      growth_percentage:
        ((totalGrossProfitAvg - prevTotalRevenueAvg) / prevTotalRevenueAvg) *
        100,
      prev_total_gross_profit: prevTotalGrossProfit,
    };
  };

  type GetTotalPpcCostType = {
    total_ppc_cost: number;
    growth_percentage: number;
    prev_total_ppc_cost: number;
  };

  const getTotalPpcCost = (): GetTotalPpcCostType => {
    const data = getYearData();
    const prevYearData = getPrevYearData();

    const totalPpcCost = arraySum(data.map((item) => item.total_ppc_fee));
    const prevTotalPpcCost = arraySum(
      prevYearData.map((item) => item.total_ppc_fee)
    );

    const totalPpcCostAvg = totalPpcCost / groupBy(data, "date_key").length;
    const prevTotalPpcCostAvg =
      prevTotalPpcCost / groupBy(prevYearData, "date_key").length;

    return {
      total_ppc_cost: totalPpcCost,
      growth_percentage:
        ((totalPpcCostAvg - prevTotalPpcCostAvg) / prevTotalPpcCostAvg) * 100,
      prev_total_ppc_cost: prevTotalPpcCost,
    };
  };

  type GetTotalProductQuantityType = {
    total_product_quantity: number;
    growth_percentage: number;
    prev_total_product_quantity: number;
  };

  const getTotalProductQuantity = (): GetTotalProductQuantityType => {
    const data = getYearData();
    const prevYearData = getPrevYearData();

    const totalProductQuantity = arraySum(
      data.map((item) => parseInt(item.total_product_quantity ?? 0))
    );

    const prevTotalProductQuantity = arraySum(
      prevYearData.map((item) => parseInt(item.total_product_quantity ?? 0))
    );

    const totalProductQuantityAvg =
      totalProductQuantity / groupBy(data, "date_key").length;
    const prevTotalProductQuantityAvg =
      prevTotalProductQuantity / groupBy(prevYearData, "date_key").length;

    return {
      total_product_quantity: totalProductQuantity,
      growth_percentage:
        ((totalProductQuantityAvg - prevTotalProductQuantityAvg) /
          prevTotalProductQuantityAvg) *
        100,
      prev_total_product_quantity: prevTotalProductQuantity,
    };
  };

  // * graphs

  type GetGeoChartDataType = Array<{
    code: CountryCodeType;
    name: string;
    image: string;
    total_revenue: number;
    total_order: number;
  }>;

  const getGeoChartData = (): GetGeoChartDataType => {
    const orderData = getYearData();
    const data = countries
      .map(({ code, name, image }) => {
        const countryData = orderData.filter((d) => d.country_code == code);
        return {
          code: code,
          name: name,
          image: image,
          total_revenue: Math.floor(
            arraySum(
              countryData.map(
                (d) => d.total_selling_amount - d.total_refund_amount
              )
            )
          ),
          total_order: arraySum(countryData.map((d) => d.total_orders)),
        };
      })
      .sort((a, b) => b.total_order - a.total_order);

    return data;
  };

  type GetAreaChartDataType = Array<{
    month: string;
    revenue: number;
    unit_sales: number;
    ppc_cost: number;
    total_orders: number;
  }>;

  const getAreaChartData = (): GetAreaChartDataType => {
    const orderData = getYearData();
    return months.map((month) => {
      return {
        month: month.slice(0, 3).toUpperCase(),
        revenue: Math.floor(
          arraySum(
            orderData
              .filter((d) => d.month === month)
              .map((d) => d.total_selling_amount - d.total_refund_amount)
          )
        ),
        unit_sales: arraySum(
          orderData
            .filter((d) => d.month === month)
            .map((d) => parseInt(d.total_product_quantity ?? 0))
        ),
        ppc_cost: Math.floor(
          arraySum(
            orderData
              .filter((d) => d.month === month)
              .map((d) => d.total_ppc_fee)
          )
        ),
        total_orders: Math.floor(
          arraySum(
            orderData
              .filter((d) => d.month === month)
              .map((d) => d.total_orders)
          )
        ),
      };
    });
  };

  type GetPieChartDataType = Array<{
    country: CountryCodeType;
    total_order: number;
  }>;

  const getPieChartData = (): GetPieChartDataType => {
    const orderData = getYearData();

    return groupBy(orderData, "country_code")
      .map((group) => {
        return {
          country: group[0].country_code,
          total_order: arraySum(group.map((d) => d.total_orders)),
        };
      })
      .sort((a, b) => b.total_order - a.total_order);
  };

  type GetBarChartDataType = Array<{
    month: string;
    UK: number;
    DE: number;
    ES: number;
    FR: number;
    IT: number;
    NL: number;
    BR: number;
    SE: number;
    PL: number;
    TR: number;
  }>;

  const getBarChartData = (): GetBarChartDataType => {
    const orderData = getYearData();

    return months.map((month) => {
      return {
        month: month.slice(0, 3).toUpperCase(),
        UK: arraySum(
          orderData
            .filter((d) => d.month == month && d.country_code == "GB")
            .map((d) => d.total_orders)
        ),
        DE: arraySum(
          orderData
            .filter((d) => d.month == month && d.country_code == "DE")
            .map((d) => d.total_orders)
        ),
        ES: arraySum(
          orderData
            .filter((d) => d.month == month && d.country_code == "ES")
            .map((d) => d.total_orders)
        ),
        FR: arraySum(
          orderData
            .filter((d) => d.month == month && d.country_code == "FR")
            .map((d) => d.total_orders)
        ),
        IT: arraySum(
          orderData
            .filter((d) => d.month == month && d.country_code == "IT")
            .map((d) => d.total_orders)
        ),
        NL: arraySum(
          orderData
            .filter((d) => d.month == month && d.country_code == "NL")
            .map((d) => d.total_orders)
        ),
        BR: arraySum(
          orderData
            .filter((d) => d.month == month && d.country_code == "BR")
            .map((d) => d.total_orders)
        ),
        SE: arraySum(
          orderData
            .filter((d) => d.month == month && d.country_code == "SE")
            .map((d) => d.total_orders)
        ),
        PL: arraySum(
          orderData
            .filter((d) => d.month == month && d.country_code == "PL")
            .map((d) => d.total_orders)
        ),
        TR: arraySum(
          orderData
            .filter((d) => d.month == month && d.country_code == "TR")
            .map((d) => d.total_orders)
        ),
      };
    });
  };

  const updateYear = (year: number) => setYear(year);

  // * get raw data

  const getYearData = (): OrdersReportRawDataType["value"] => {
    return (ordersRawData.data?.value ?? []).filter((item) => {
      const date = new Date(item.date_key);
      return date >= new Date(year, 0, 1) && date <= new Date(year, 11, 31);
    });
  };

  const getPrevYearData = (): OrdersReportRawDataType["value"] => {
    return (ordersRawData.data?.value ?? []).filter((item) => {
      const date = new Date(item.date_key);
      return (
        date >= new Date(year - 1, 0, 1) && date <= new Date(year - 1, 11, 31)
      );
    });
  };

  return (
    <OrderContext.Provider
      value={{
        isLoading,
        overview,
        year,
        updateYear,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;
