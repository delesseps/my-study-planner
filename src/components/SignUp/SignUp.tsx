import React from "react";
import styled from "styled-components";
import { Divider } from "antd";
import OAuthButtons from "components/OAuthButtons/OAuthButtons";
import BannerAuth from "components/BannerAuth/BannerAuth";
import FadeIn from "components/FadeIn/FadeIn";
import { ReactComponent as Logo } from "assets/logo.svg";
import SignUpForm from "./SignUpForm";
import { Link } from "react-router-dom";

const Wrapper = styled.main`
  display: flex;
  flex: 1;
`;

const LeftSection = styled.section`
  flex: 0 0 45%;
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(
    163.41deg,
    ${props => props.theme.colors.main} 8.66%,
    rgba(2, 240, 251, 0) 207.55%
  );

  display: flex;
  flex-direction: column;
`;

const StyledLogo = styled(Logo)`
  fill: #fff;
  width: 5rem;
  height: 5rem;
  cursor: pointer;
`;

const RightSection = styled.section`
  min-height: 100vh;
  flex: 0 0 55%;
  background-color: white;
  padding: 2rem 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightSectionWrapper = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignIn = styled.h4`
  font-weight: 400;
  color: ${props => props.theme.fontColors.blackRgba(0.8)};
  margin-top: 9rem;

  & a {
    cursor: pointer;
    color: ${props => props.theme.colors.main};

    &:hover {
      text-decoration: underline;
    }
  }
`;

const SignUp: React.FC = () => {
  return (
    <FadeIn>
      <Wrapper>
        <LeftSection>
          <StyledLogo />
          <BannerAuth />
        </LeftSection>
        <RightSection>
          <RightSectionWrapper>
            <SignUpForm />
            <Divider>Or</Divider>
            <OAuthButtons />
            <SignIn>
              Already have an account? <Link to="/signin">Sign In</Link>
            </SignIn>
          </RightSectionWrapper>
        </RightSection>
      </Wrapper>
    </FadeIn>
  );
};

export default SignUp;
