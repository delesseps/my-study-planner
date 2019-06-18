import React from "react";
import styled from "styled-components";
import { ReactComponent as GoogleLogo } from "assets/google_logo.svg";
import { Icon } from "antd";

const Wrapper = styled.div`
  width: 100%;
  margin-top: 2.4rem;

  & > a:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

const GoogleButton = styled.a`
  && {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const StyledGoogleLogo = styled(GoogleLogo)`
  width: 24px;
  margin-right: 1.2rem;
`;

const FacebookButton = styled.a`
  && {
    background-color: #3f51b5; /*Facebook trademark color*/
    color: #fff;

    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: #5e6ec7;
      color: #fff;
      border-color: initial;
    }

    &:focus {
      background-color: #5e6ec7;
      color: #fff;
      border-color: initial;
    }
  }
`;

const StyledIcon = styled(Icon)`
  margin-right: 1.2rem;
  font-size: 24px;
`;

const OAuthButtons = ({ type }: { type?: string }) => {
  return (
    <Wrapper>
      <GoogleButton
        className="ant-btn ant-btn-default ant-btn-lg ant-btn-block"
        href="http://localhost:3000/api/auth/google"
      >
        <StyledGoogleLogo />
        {type === "signin" ? "Sign in with Google" : "Sign up with Google"}
      </GoogleButton>

      <FacebookButton className="ant-btn ant-btn-default ant-btn-lg ant-btn-block">
        <StyledIcon type="facebook" />
        {type === "signin" ? "Sign in with Facebook" : "Sign up with Facebook"}
      </FacebookButton>
    </Wrapper>
  );
};

export default OAuthButtons;
