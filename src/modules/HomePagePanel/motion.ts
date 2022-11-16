import { Variants } from "framer-motion";

export const leftCardVariants: Variants = {
  animate: {
    opacity: [0, 1, 1],
    x: [-100, 0],
    transition: {
      duration: 2,
      ease: "easeInOut",
    },
  },
};

export const rightCardVariants: Variants = {
  animate: {
    opacity: [0, 1, 1],
    x: [100, 0],
    transition: {
      duration: 2,
      ease: "easeInOut",
    },
  },
};
