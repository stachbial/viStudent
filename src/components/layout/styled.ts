import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import bg from "../../assets/bg.png";
export const StyledContainer = styled(Grid)`
  width: 100%;
  height: 100vh;

  &::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    background-image: url(${bg.src});
    z-index: -999;
    filter: invert(1);
    opacity: 0.03;
  }
`;
