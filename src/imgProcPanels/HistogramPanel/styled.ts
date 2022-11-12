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

export const StyledEmptyMsgWrapper = styled("div")`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

export const StyledEmptyDataMsg = styled("div")`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px 10px;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.7;
    z-index: -1;
    border-radius: 10px;
  }
`;
