import * as React from "react";
import styled from "styled-components";
import { Button } from "antd";

const Wrapper = styled.main`
  display: flex;
  flex: 1;
`;

const LeftSection = styled.section`
  flex: 0 0 50%;
  background-color: blue;
`;

const RightSection = styled.section`
  flex: 0 0 50%;
  background-color: gray;
`;

const SignIn: React.FC = () => {
  return (
    <Wrapper>
      <LeftSection>test</LeftSection>
      <RightSection>
        <Button type="primary">Sign In</Button>
      </RightSection>
    </Wrapper>
  );
};

export default SignIn;
