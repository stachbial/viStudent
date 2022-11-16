import React from "react";
import { Variants } from "framer-motion";
import { StyledSubPanelContainer } from "./styled";
import MotionContainer from "../../components/MotionContainer";

const subPanelVariants: Variants = {
  initial: {
    opacity: 0,
    x: -200,
  },
  animate: {
    opacity: 1,
    x: [-70, 0],
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    x: 200,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

export const MotionSubPanelContainer = ({
  children,
  wide,
  presenceKey,
}: {
  children?: React.ReactNode;
  wide?: boolean;
  presenceKey?: string;
}) => {
  return (
    <MotionContainer
      presenceKey={presenceKey}
      variants={subPanelVariants}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <StyledSubPanelContainer wide={wide}>{children}</StyledSubPanelContainer>
    </MotionContainer>
  );
};
