import styled from "@emotion/styled";

export const StyledSubPanelContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "wide",
})<{ wide?: boolean }>(({ wide }) => ({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  justifyContent: "space-evenly",
  padding: wide ? "0 38px" : "0 84px",
}));
