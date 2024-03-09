export type protectedRoutes = Exclude<
  (typeof routes)[number],
  "/login" | "/register"
>;

export type MiddlewareConfigType = {
  matcher: [...protectedRoutes[]];
};

export type LogInFormInput = {
  email: string;
  password: string;
};

export interface ITodo {
  id: number;
  title: string;
  description: string;
  status: boolean;
}

export type OrderContextType = {
  isLoading: boolean;
  overview: OrderOverviewType;
  year: number;
  updateYear: (number) => void;
};

export type OrdersReportRawDataType = {
  value: Array<{
    country_code: "DE" | "ES" | "FR" | "GB" | "IT" | "NL" | "PL" | "SE" | "TR";
    year: number;
    month: string;
    total_orders: number;
    total_product_quantity: string;
    total_selling_amount: number;
    total_refund_amount: number;
    total_shipping_cost: number;
    total_amazon_commission: number;
    total_ppc_fee: number;
    total_cost_price: number;
    identifier: string;
    date_key: string;
  }>;
};

export type OrderOverviewType = {
  order: {
    total_order: number;
    growth_percentage: number;
    prev_total_order: number;
  };
  revenue: {
    total_revenue: number;
    growth_percentage: number;
    prev_total_revenue: number;
  };
  profit: {
    total_gross_profit: number;
    growth_percentage: number;
    prev_total_gross_profit: number;
  };
  ppc_cost: {
    total_ppc_cost: number;
    growth_percentage: number;
    prev_total_ppc_cost: number;
  };
  product_quantity: {
    total_product_quantity: number;
    growth_percentage: number;
    prev_total_product_quantity: number;
  };
  geo_chart_data: [];
  area_chart_data: [];
  pie_chart_data: [];
};
