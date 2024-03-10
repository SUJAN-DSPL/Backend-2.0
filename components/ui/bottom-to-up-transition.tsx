"use client";

import * as React from "react";

import { motion } from "framer-motion";

interface BottomToUpTransactionProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const BottomToUpTransaction = React.forwardRef<
  HTMLDivElement,
  BottomToUpTransactionProps
>(({ className, children, ...props }, ref) => {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.95 }}
    >
      {children}
    </motion.div>
  );
});

BottomToUpTransaction.displayName = "BottomToUpTransaction";
export default BottomToUpTransaction;
