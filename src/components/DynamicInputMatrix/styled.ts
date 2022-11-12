import styled from "@emotion/styled";
import { Typography } from "@mui/material";

export const StyledContainer = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledMatrixWrapper = styled("div")``;

export const StyledMatrixRow = styled("div")``;

export const StyledMatrixActions = styled("div")`
  margin-top: 20px;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  align-items: center;
`;

export const StyledMatrixTitle = styled(Typography)`
  margin-bottom: 20px;
  margin-left: 30px;
  align-self: flex-start;
`;
