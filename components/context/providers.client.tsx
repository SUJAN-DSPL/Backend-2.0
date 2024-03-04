"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { Provider as ReduxProvider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./theme-provider";
import { TooltipProvider } from "@radix-ui/react-tooltip";
// import { store } from "@/state/store";

interface Props {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export default function Provider({ children }: Props) {
  return (
    // <ReduxProvider store={store}>
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <TooltipProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </TooltipProvider>
      </SessionProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    // </ReduxProvider>
  );
}
