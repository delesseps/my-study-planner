import React from "react";
import { Button } from "antd";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  margin-top: 2.4rem;

  & > button:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

const FacebookButton = styled(Button)`
  && {
    background-color: #3f51b5; /*Facebook trademark color*/
    color: #fff;

    &:hover {
      background-color: #5e6ec7;
      color: #fff;
    }

    &:focus {
      background-color: #5e6ec7;
      color: #fff;
    }
  }
`;

const OAuthButtons = ({ type }: { type?: string }) => {
  return (
    <Wrapper>
      <Button type="default" size="large" icon="google" block>
        {type === "signin" ? "Sign in with Google" : "Sign up with Google"}
      </Button>
      <FacebookButton type="default" size="large" icon="facebook" block>
        {type === "signin" ? "Sign in with Facebook" : "Sign up with Facebook"}
      </FacebookButton>
    </Wrapper>
  );
};

export default OAuthButtons;
