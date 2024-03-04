"use client";

import { useState, useEffect, FC } from "react";
import {
  useAnimate,
  stagger,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";

interface MenusProps {}

const Menus: FC<MenusProps> = () => {
  const [open, setOpen] = useState(false);
  const [scope, animate] = useAnimate();
  const items = ["Item 1", "Item 2", "Item 3", "Item 4"];

  // the stagger effect
  const staggerList = stagger(0.1, { startDelay: 0.25 });

  useEffect(() => {
    animate(
      "ul",
      {
        width: open ? 150 : 0,
        height: open ? 200 : 0,
        opacity: open ? 1 : 0,
      },
      {
        type: "spring",
        bounce: 0,
        duration: 0.4,
      }
    );
    animate(
      "li",
      open
        ? { opacity: 1, scale: 1, x: 0 }
        : { opacity: 0, scale: 0.3, x: -50 },
      {
        duration: 0.2,
        delay: open ? staggerList : 0,
      }
    );
  }, [open]);

  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, 500, {
      duration: 2,
    });

    return animation.stop;
  }, []);

  return <></>;
};

export default Menus;
