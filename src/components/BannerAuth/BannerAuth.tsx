import React from "react";
import styled, { keyframes } from "styled-components";
import { ReactComponent as LogoSharp } from "assets/logo_sharp.svg";
import { ReactComponent as Stars } from "assets/stars.svg";
import { ReactComponent as Check } from "assets/check.svg";
import { breakpoints } from "styled";

const twinkle = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0.5;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: auto;
  margin-bottom: auto;
`;

const Text = styled.h2`
  color: #fff;
  text-align: center;
  letter-spacing: 0.4rem;
  line-height: 4.1rem;

  font-weight: 400;
`;

const SVGWrapper = styled.div`
  margin: 7rem 0;
  position: relative;

  @media only screen and (max-width: ${breakpoints.bpLargest}) {
    margin: 4rem 0;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
`;

//Selects a random star and make it twinkle with a specific delay
const twinkleRandomItem = () => {
  let styles = "";

  for (let i = 0; i < 20; i++) {
    styles += `
      & path:nth-child(${i + 1}) {
        animation-delay: ${i - 1}s;        
      }
    `;
  }

  return styles;
};

const StyledLogoSharp = styled(LogoSharp)`
  width: 40rem;

  @media only screen and (max-width: ${breakpoints.bpLargest}) {
    width: 33rem;
  }
`;

const StyledStars = styled(Stars)`
  margin-bottom: -70px;
  margin-right: 10px;
  width: 53rem;

  @media only screen and (max-width: ${breakpoints.bpLargest}) {
    width: 45rem;
  }

  @media only screen and (max-width: ${breakpoints.bpMedium}) {
    width: 38rem;
    margin-right: 0;
  }

  & path {
    animation: ${twinkle} 1.5s ease-in-out infinite;
    animation-direction: alternate;
  }

  ${twinkleRandomItem()};
`;

const StyledCheck = styled(Check)`
  position: absolute;
  bottom: 1rem;
  right: -2rem;

  width: 16rem;
  height: 12rem;

  @media only screen and (max-width: ${breakpoints.bpLargest}) {
    bottom: 2rem;
  }
`;

const BannerAuth: React.FC = () => {
  return (
    <Wrapper>
      <Text>
        Plan your activities, have fun and <br /> keep those grades up!
      </Text>
      <Text>
        Don’t ever forget a single <br /> homework again!
      </Text>
      <SVGWrapper>
        <StyledStars />
        <StyledLogoSharp />
        <StyledCheck />
      </SVGWrapper>
      <Text>Continue and get things done!</Text>
    </Wrapper>
  );
};

export default BannerAuth;
