import styled from "@emotion/styled";
import { Grid, Modal } from "@mui/material";
import { theme } from "../../theme/theme";
export const StyledModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
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

export const StyledMediaWrapper = styled("div")`
  width: 95vw;
  height: 70vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledActions = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

export const StyledTitle = styled("div")`
  background-color: ${theme.palette.primary.light};
  padding: 0.5rem 2rem;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledExitButtonWrapper = styled("div")`
  position: absolute;
  right: 3rem;
`;
