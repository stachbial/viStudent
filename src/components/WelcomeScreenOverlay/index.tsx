import { Backdrop, Typography } from "@mui/material";
import { MotionLogo } from "../Logo/motion";
import MotionContainer from "../MotionContainer";
import Loader from "../Loader";
import {
  StyledContainer,
  StyledLogoWrapper,
  StyledLoaderWrapper,
} from "./styled";
import {
  excerptTextVariants,
  loaderVariants,
  logoPathVariants,
} from "./motion";

const WelcomeScreenOverlay = ({
  open,
  onAnimationComplete,
}: {
  open: boolean;
  onAnimationComplete: (definition: any) => void;
}) => {
  return (
    <Backdrop open={open} sx={{ background: "none" }}>
      <StyledContainer>
        <StyledLogoWrapper>
          <MotionLogo
            animate="animate"
            motionVariants={logoPathVariants}
            onPathAnimationComplete={onAnimationComplete}
          />
        </StyledLogoWrapper>
        <MotionContainer
          variants={excerptTextVariants}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Typography>Politechnika Gdańska 2022, WEIA, ARiSS (RiSM)</Typography>
          <Typography>
            "Podstawowe metody cyfrowego przetwarzania obrazów"
          </Typography>
          <Typography>
            Projekt inżynierski, autor: S. Białecki 181412
          </Typography>
        </MotionContainer>
        <MotionContainer variants={loaderVariants}>
          <StyledLoaderWrapper>
            <Loader />
          </StyledLoaderWrapper>
        </MotionContainer>
      </StyledContainer>
    </Backdrop>
  );
};

export default WelcomeScreenOverlay;
