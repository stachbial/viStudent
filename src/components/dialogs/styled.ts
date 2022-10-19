import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { theme } from "../../theme/theme";

export const StyledSubtitle = styled(Typography)`
  color: white;
  margin-bottom: 1.5rem;
`;
export const StyledExtensionCard = styled("div")`
  background-color: ${theme.palette.grey[300]};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
`;
