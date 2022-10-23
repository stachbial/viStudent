import styled from "@emotion/styled";
import { IconButton } from "@mui/material";

export const StyledModuleWrapper = styled("div")`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledImageWrapper = styled("div")`
  position: relative;
  width: 45vw;
  height: 80vh;
  margin: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledContent = styled("div")`
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledHomeButton = styled(IconButton)`
  align-self: flex-end;
`;

export const StyledActions = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;
