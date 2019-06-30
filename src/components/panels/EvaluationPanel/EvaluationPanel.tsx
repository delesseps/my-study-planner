import React from "react";
import IEvaluation from "interfaces/IEvaluation";
import styled from "styled-components";
import { Button, Empty } from "antd";
import { ApplicationState } from "store/types";
import { connect, useDispatch } from "react-redux";
import EvaluationDrawer from "components/drawers/EvaluationDrawer/EvaluationDrawer";
import { evaluationDrawer } from "store/actions";
import EvaluationCard from "components/cards/EvaluationCard/EvaluationCard";

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

interface IEvaluationProps {
  evaluations: IEvaluation[];
}

const Evaluation: React.FC<IEvaluationProps> = ({ evaluations }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(evaluationDrawer());
  };

  return (
    <React.Fragment>
      <Header>
        <Title>Evaluations</Title>
        <Button onClick={handleClick} type="primary">
          NEW EVALUATION
        </Button>
        <EvaluationDrawer />
      </Header>
      <Content>
        {evaluations.filter(evaluation => !evaluation.done).length ? (
          evaluations.map(
            (evaluation, i) =>
              !evaluation.done && (
                <EvaluationCard
                  index={i}
                  key={evaluation._id}
                  evaluation={evaluation}
                />
              )
          )
        ) : (
          <StyledEmpty description="No Evaluations" />
        )}
      </Content>
    </React.Fragment>
  );
};

const mapStateToProps = (state: ApplicationState) => {
  return {
    evaluations: state.reducer.user.evaluations
  };
};

export default connect(
  mapStateToProps,
  null
)(Evaluation);
