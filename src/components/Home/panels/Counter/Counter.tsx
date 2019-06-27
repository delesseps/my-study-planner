import React, { useEffect, useState } from "react";
import IUser from "interfaces/IUser";
import { ApplicationState } from "store/types";
import { connect } from "react-redux";
import styled from "styled-components";
import { isThisWeek } from "utils";
import moment from "moment";

const Header = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 0.5rem;

  color: ${props => props.theme.fontColors.blackRgba(0.8)};
`;

const Subtitle = styled.h5`
  font-weight: 500;
  letter-spacing: 1px;
  margin-bottom: 0rem;

  color: ${props => props.theme.fontColors.blackRgba(0.5)};
`;

const Count = styled.h1`
  font-weight: 300;
  font-size: 5.9rem;
  position: absolute;
  margin-bottom: 0;

  bottom: 0;
  right: 2rem;

  color: ${props => props.theme.fontColors.blackRgba(0.8)};
`;

interface ICounterProps {
  homework?: boolean;
  user: IUser;
}

const Counter: React.FC<ICounterProps> = ({ user, homework }) => {
  const [evaluationCount, setEvaluationCount] = useState(0);

  useEffect(() => {
    //Gets amount of evaluations this week
    setEvaluationCount(
      user.evaluations.filter(
        evaluation => isThisWeek(moment(evaluation.date)) && !evaluation.done
      ).length
    );
  }, [user.evaluations]);

  return (
    <>
      <Header>
        <Title>{homework ? "Homework" : "Evaluations"}</Title>
        <Subtitle>This week</Subtitle>
      </Header>
      <Count>{homework ? user.homework.length : evaluationCount}</Count>
    </>
  );
};

const mapStateToProps = (state: ApplicationState) => {
  return {
    user: state.reducer.user
  };
};

export default connect(
  mapStateToProps,
  null
)(Counter);
