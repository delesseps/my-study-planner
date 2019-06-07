import React from "react";
import styled from "styled-components";
import SignInForm from "./SignInForm";
import { Divider } from "antd";
import OAuthButtons from "components/OAuthButtons/OAuthButtons";
import BannerAuth from "components/BannerAuth/BannerAuth";
import { ReactComponent as Logo } from "assets/logo.svg";
import { Link } from "react-router-dom";
import { breakpoints } from "styled";

const Wrapper = styled.main`
  display: flex;
  flex: 1;
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

const SignUp = styled.h4`
  font-weight: 400;
  color: ${props => props.theme.fontColors.blackRgba(0.8)};
  margin-top: 9rem;

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
  );
};

export default SignIn;
