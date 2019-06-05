import React from "react";
import styled from "styled-components";
import SignInForm from "./SignInForm";

const Wrapper = styled.main`
  display: flex;
  flex: 1;
`;

const LeftSection = styled.section`
  flex: 0 0 50%;
  height: 100vh;
  background: linear-gradient(
    163.41deg,
    ${props => props.theme.main} 8.66%,
    rgba(2, 240, 251, 0) 207.55%
  );
`;

const RightSection = styled.section`
  flex: 0 0 50%;
  background-color: white;
`;

const SignIn: React.FC = () => {
  return (
    <Wrapper>
      <LeftSection>test</LeftSection>
      <RightSection>
        <SignInForm />
      </RightSection>
    </Wrapper>
  );
};

export default SignIn;
