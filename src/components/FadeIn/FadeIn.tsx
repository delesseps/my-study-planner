//Display fade animation after loading
import * as React from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
   from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  animation: ${fadeIn} 0.5s;
`;

const FadeIn = ({ children }: { children: React.ReactElement }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default FadeIn;
