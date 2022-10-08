import styled from "@emotion/styled";
import { Container, Box, Grid } from "@mui/material";
export const StyledModuleWrapper = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledContentWrapper = styled("div")`
  height: 90%;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledInputControlsWrapper = styled("div")`
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
`;
