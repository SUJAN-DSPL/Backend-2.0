"use client";

import * as React from "react";

import { delay, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ListingEffectProps extends React.HTMLAttributes<HTMLDivElement> {
  key: string|number;
  delay: number;
}

const ListingEffect = React.forwardRef<HTMLDivElement, ListingEffectProps>(
  ({ key, delay, className, children, ...props }, ref) => {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.3, x: -50 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{
          ease: "easeInOut",
          duration: 0.2,
          delay: delay,
        }}
        whileHover={{ scale: 0.9 }}
        key={key}
        className={cn(" overflow-hidden", className)}
      >
        {children}
      </motion.div>
    );
  }
);

ListingEffect.displayName = "ListingEffect";
export default ListingEffect;
