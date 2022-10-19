import styled from "@emotion/styled";
import { keyframes } from "@mui/styled-engine";

const atom = keyframes`
  from { transform: none; }
  to { transform: rotate(360deg); }
  /* to { transform: none; } */
`;

const electronCircle1 = keyframes`

  from { transform: rotateY(70deg) rotateZ(20deg); }
  to { transform: rotateY(70deg) rotateZ(380deg); }
`;

const electron1 = keyframes`

  from { transform: rotateZ(-20deg) rotateY(-70deg); }
  to { transform: rotateZ(-380deg) rotateY(-70deg); }
`;

const electronCircle2 = keyframes`

  from { transform: rotateY(60deg) rotateX(60deg) rotateZ(-30deg); }
  to { transform: rotateY(60deg) rotateX(60deg) rotateZ(330deg); }
`;

const electron2 = keyframes`

  from { transform: rotateZ(30deg) rotateX(-60deg) rotateY(-60deg); }
  to { transform: rotateZ(-330deg) rotateX(-60deg) rotateY(-60deg); }
`;

const electronCircle3 = keyframes`

  from { transform: rotateY(-60deg) rotateX(60deg) rotateZ(100deg); }
  to { transform: rotateY(-60deg) rotateX(60deg) rotateZ(460deg); }
`;

const electron3 = keyframes`

  from { transform: rotateZ(-100deg) rotateX(-60deg) rotateY(60deg); }
  to { transform: rotateZ(-460deg) rotateX(-60deg) rotateY(60deg); }
`;

export const StyledAtom = styled("div")`
  z-index: -1;
  position: absolute;
  margin: 50px auto;
  width: 120px;
  height: 120px;
  /* position: relative; */
  animation: ${atom} 4s ease-in-out infinite alternate;
  perspective: 300px;
  transform-style: preserve-3d;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background: #398fba;
  }
`;

export const StyledElectron = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border: 2px solid #9ce2e2;
  transform-style: preserve-3d;

  &::before {
    content: "";
    position: absolute;
    top: -4px;
    left: 0;
    right: 0;
    margin: auto;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #b0ffff;
    transform-origin: 50% 50% 0;
  }

  &:nth-child(1) {
    transform: rotateY(70deg) rotateZ(20deg);
    animation: ${electronCircle1} 3s linear infinite;
  }

  &:nth-child(2) {
    transform: rotateY(60deg) rotateX(60deg) rotateZ(-30deg);
    animation: ${electronCircle2} 3s linear infinite;
  }

  &:nth-child(3) {
    transform: rotateY(-60deg) rotateX(60deg) rotateZ(100deg);
    animation: ${electronCircle3} 3s linear infinite;
  }

  &:nth-child(1)::before {
    transform: rotateZ(-20deg) rotateY(-70deg);
    animation: ${electron1} 3s linear infinite;
  }

  &:nth-child(2)::before {
    transform: rotateZ(30deg) rotateX(-60deg) rotateY(-60deg);
    animation: ${electron2} 3s linear infinite;
  }

  &:nth-child(3)::before {
    transform: rotateZ(-100deg) rotateX(-60deg) rotateY(60deg);
    animation: ${electron3} 3s linear infinite;
  }
`;

export const StyledBasic = styled("span")`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  border-top: 4px solid #242f3e;
  border-right: 4px solid transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  &::after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border-bottom: 4px solid #b0ffff;
    border-left: 4px solid transparent;
  }
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const StyledLoader = styled("span")`
  position: absolute;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  border: 3px solid;
  border-color: #374963 #374963 transparent transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  &::after,
  &::before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border: 3px solid;
    border-color: transparent transparent #b0ffff #b0ffff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-sizing: border-box;
    animation: rotationBack 0.5s linear infinite;
    transform-origin: center center;
  }
  &::before {
    width: 32px;
    height: 32px;
    border-color: #374963 #374963 transparent transparent;
    animation: rotation 1.5s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes rotationBack {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-360deg);
    }
  }
`;
