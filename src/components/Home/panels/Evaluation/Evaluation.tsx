import React from "react";
import IEvaluation from "interfaces/IEvaluation";
import styled from "styled-components";
import { Button, Empty } from "antd";
import { ApplicationState } from "store/types";
import { connect } from "react-redux";

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
  margin-bottom: 0.5rem;

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
    evaluations: state.reducer.user.evaluations
  };
};

interface IEvaluationProps {
  evaluations: IEvaluation[];
}

const Evaluation: React.FunctionComponent<IEvaluationProps> = ({
  evaluations
}) => {
  return (
    <React.Fragment>
      <Header>
        <Title>Evaluations</Title>
        <Button type="primary">NEW EVALUATION</Button>
      </Header>
      <Content>
        {evaluations.length ? (
          "Content"
        ) : (
          <StyledEmpty description="No Evaluations" />
        )}
      </Content>
    </React.Fragment>
  );
};

export default connect(
  mapStateToProps,
  null
)(Evaluation);
