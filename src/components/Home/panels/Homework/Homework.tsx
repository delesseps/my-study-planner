import React from "react";
import styled from "styled-components";
import { Button, Empty } from "antd";
import { ApplicationState } from "store/types";
import { connect } from "react-redux";
import IHomework from "interfaces/IHomework";

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

const mapStateToProps = (state: ApplicationState) => {
  return {
    homework: state.reducer.user.homework
  };
};

interface IHomeworkProps {
  homework: IHomework[];
}

const Homework: React.FunctionComponent<IHomeworkProps> = ({ homework }) => {
  return (
    <React.Fragment>
      <Header>
        <Title>Homework</Title>
        <Button type="primary">NEW HOMEWORK</Button>
      </Header>
      <Content>
        {homework.length ? (
          "Content"
        ) : (
          <StyledEmpty description="No Homework" />
        )}
      </Content>
    </React.Fragment>
  );
};

export default connect(
  mapStateToProps,
  null
)(Homework);
