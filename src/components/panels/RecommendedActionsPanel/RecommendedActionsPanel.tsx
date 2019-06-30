import React from "react";
import styled from "styled-components";
import { Empty } from "antd";

const Header = styled.div`
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.fontColors.blackRgba(0.1)};
`;

const Title = styled.h3`
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;

  color: ${props => props.theme.fontColors.blackRgba(0.8)};
`;

const Content = styled.div`
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;

  & > *:not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

const StyledEmpty = styled(Empty)`
  && {
    margin-top: auto;
    margin-bottom: auto;
  }
`;

const RecommendedActions: React.FC = props => {
  return (
    <React.Fragment>
      <Header>
        <Title>Recommended Actions</Title>
      </Header>
      <Content>
        <StyledEmpty description="No Recomendations" />
      </Content>
    </React.Fragment>
  );
};

export default RecommendedActions;
