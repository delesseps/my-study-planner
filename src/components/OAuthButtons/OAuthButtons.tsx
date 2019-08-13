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

const OAuthButtons = ({ type }: { type?: string }) => {
  return (
    <Wrapper>
      <GoogleButton
        className="ant-btn ant-btn-default ant-btn-lg ant-btn-block"
        href="http://localhost:3001/api/auth/google"
      >
        <StyledGoogleLogo />
        {type === "signin" ? "Sign in with Google" : "Sign up with Google"}
      </GoogleButton>
    </Wrapper>
  );
};

export default OAuthButtons;
