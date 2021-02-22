import styled from "@emotion/styled";
import React from "react";
import { keyframes } from "@emotion/react";

const StyledSpinnerWrapper = styled.div({
  background: "rgba(0,0,0,.7)",
  width: "100%",
  height: "100vh",
  position: "absolute",
  top: 0,
  left: 0,
});

const spinner = keyframes`
    0% {
    transform: translate3d(-50%, -50%, 0) rotate(0deg);
  }
  100% {
    transform: translate3d(-50%, -50%, 0) rotate(360deg);
  }
`;

const StyledSpinner = styled.div({
  animation: `1.5s linear infinite ${spinner}`,
  animationPlayState: "inherit",
  border: "solid 5px #cfd0d1",
  borderBottomColor: "#1c87c9",
  borderRadius: "50%",
  content: "''",
  height: 40,
  width: 40,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate3d(-50%, -50%, 0)",
  willChange: "transform",
});

const Spinner = () => {
  return (
    <StyledSpinnerWrapper>
      <StyledSpinner />
    </StyledSpinnerWrapper>
  );
};

export { Spinner };
