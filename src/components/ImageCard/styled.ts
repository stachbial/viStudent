import styled from "@emotion/styled";

export const StyledBackdrop = styled("div")`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.6;
`;

export const StyledTextWrapper = styled("div")`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 0.5rem 1rem;
  border-radius: 0.8rem;
`;

export const StyledCard = styled("div")`
  position: relative;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  cursor: pointer;

  img {
    transition: 0.7s ease-in;
    filter: grayscale(80%);
  }

  &:hover {
    -webkit-box-shadow: 0px 0px 15px 0px rgba(255, 255, 255, 0.1);
    -moz-box-shadow: 0px 0px 15px 0px rgba(255, 255, 255, 0.1);
    box-shadow: 0px 0px 15px 0px rgba(255, 255, 255, 0.1);
    img {
      filter: initial;
      transition: 1.3s ease-out;
      transform: scale(1.05);
    }
  }
`;
