"use client";

import * as React from "react";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LeftToRightTransactionProps
  extends React.HTMLAttributes<HTMLDivElement> {
    key: string;
  }

const LeftToRightTransaction = React.forwardRef<
  HTMLDivElement,
  LeftToRightTransactionProps
>(({key, className, children, ...props }, ref) => {
  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.95 }}
      className={cn(" overflow-hidden", className)}
      key={key}
    >
      {children}
    </motion.div>
  );
});

LeftToRightTransaction.displayName = "LeftToRightTransaction";
export default LeftToRightTransaction;
