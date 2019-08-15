import React from "react";
import styled from "styled-components";
import SignInForm from "components/SignInForm/SignInForm";
import { Divider } from "antd";
import OAuthButtons from "components/OAuthButtons/OAuthButtons";
import BannerAuth from "components/BannerAuth/BannerAuth";
import { ReactComponent as Logo } from "assets/logo.svg";
import { Link } from "react-router-dom";
import FadeIn from "components/FadeIn/FadeIn";
import { breakpoints } from "styled";

const Wrapper = styled.main`
  display: flex;
  flex: 1;

  @media only screen and (max-width: ${breakpoints.bpMedium}) {
    flex-direction: column-reverse;
  }
`;

const LeftSection = styled.section`
  min-height: 100vh;
  flex: 0 0 45%;
  padding: 2rem;
  background: linear-gradient(
    163.41deg,
    ${props => props.theme.colors.main} 8.66%,
    rgba(2, 240, 251, 0) 207.55%
  );

  display: flex;
  flex-direction: column;

  @media only screen and (max-width: ${breakpoints.bpLargest}) {
    padding: 2rem;
  }
`;

const StyledLogo = styled(Logo)`
  fill: #fff;
  width: 5rem;
  height: 5rem;
  cursor: pointer;

  @media only screen and (max-width: ${breakpoints.bpLargest}) {
    margin-bottom: 3rem;
  }
`;

const RightSection = styled.section`
  min-height: 100vh;
  flex: 0 0 55%;
  background-color: white;
  padding: 2rem 6rem;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: ${breakpoints.bpMedium}) {
    min-height: 90vh;
  }

  @media only screen and (max-width: ${breakpoints.bpLargest}) {
    padding: 3rem 0;
  }
`;

const RightSectionWrapper = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignUp = styled.h4`
  font-weight: 400;
  color: ${props => props.theme.fontColors.textRgba(0.8)};
  margin-top: 5rem;

  @media only screen and (max-width: ${breakpoints.bpLargest}) {
    margin-top: 5rem;
  }

  & a {
    cursor: pointer;
    color: ${props => props.theme.colors.main};

    &:hover {
      text-decoration: underline;
    }
  }
`;

const SignIn: React.FC = () => {
  return (
    <FadeIn>
      <Wrapper>
        <LeftSection>
          <StyledLogo />
          <BannerAuth />
        </LeftSection>
        <RightSection>
          <RightSectionWrapper>
            <SignInForm />
            <Divider>Or</Divider>
            <OAuthButtons type="signin" />
            <SignUp>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </SignUp>
          </RightSectionWrapper>
        </RightSection>
      </Wrapper>
    </FadeIn>
  );
};

export default SignIn;
