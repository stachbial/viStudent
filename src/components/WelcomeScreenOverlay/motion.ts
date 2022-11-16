import React from "react";
import { motion, Variants } from "framer-motion";
import { display } from "@mui/system";
export const logoPathVariants: Variants = {
  animate: {
    pathLength: [0, 1],
    fillOpacity: [0, 0.8, 1, 1],
    transition: {
      duration: 10,
      ease: "easeInOut",
    },
  },
};

export const excerptTextVariants: Variants = {
  animate: {
    opacity: [0, 0.4, 0.6],
    transition: {
      duration: 10,
      ease: "easeInOut",
    },
  },
};

export const loaderVariants: Variants = {
  animate: {
    opacity: [0, 0, 1],
    transition: {
      duration: 10,
    },
  },
};
