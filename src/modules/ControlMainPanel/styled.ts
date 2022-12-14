import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { theme } from "../../theme/theme";

export const StyledWrapper = styled(Grid)``;

export const StyledBackground = styled("div")`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 0 10px 10px 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background-color: ${theme.palette.grey[800]};
    opacity: 0.7;
  }
`;
