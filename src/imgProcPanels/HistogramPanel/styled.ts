import styled from "@emotion/styled";

export const StyledActionsContainer = styled("div")`
  margin-left: 50px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
`;

export const StyledHistContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "short",
})<{ short?: boolean }>(({ short }) => ({
  position: "relative",
  width: "100%",
  height: short ? "60%" : "75%",
}));

export const StyledMaskOptionsContainer = styled("div")`
  margin-top: 10px;
  margin-left: 50px;
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;
