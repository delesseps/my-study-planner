import React from "react";
import { Spin, Icon } from "antd";
import { ReactComponent as Logo } from "assets/logo.svg";
import styled, { keyframes } from "styled-components";

const fadeInUp = keyframes`
    0% {
      transform: translateY(10%);
      opacity: 0;
    }

    100% {
      transform: translateY(0);
      opacity: 1;
    }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  min-height: 100vh;
  background-color: ${props => props.theme.backgroundColor};

  & > div {
    animation: ${fadeInUp} 0.8s;
  }
`;

const StyledLogo = styled(Logo)`
  width: 5rem;
  height: 5rem;
  margin-bottom: 0.9rem;
  animation: ${fadeInUp} 0.8s;
`;

const Loading: React.FC = () => {
  const antIcon = <Icon type="loading" style={{ fontSize: 25 }} spin />;

  return (
    <Wrapper>
      <StyledLogo />
      <Spin indicator={antIcon} />
    </Wrapper>
  );
};

export default Loading;
