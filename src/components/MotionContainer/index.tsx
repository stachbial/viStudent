import { motion, Variants, MotionStyle } from "framer-motion";

const MotionContainer = ({
  children,
  variants,
  presenceKey,
  style,
}: {
  children: React.ReactNode;
  variants?: Variants;
  presenceKey?: string;
  style?: MotionStyle;
}) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      style={style}
      key={presenceKey}
    >
      {children}
    </motion.div>
  );
};

export default MotionContainer;
