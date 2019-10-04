import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Empty } from "antd";
import { ApplicationState } from "store/types";
import { connect } from "react-redux";
import { determinePriorityNumber, determinePriorityDateNumber } from "utils";
import moment from "moment";
import { RecommendedActionCard } from "components/cards";

import IEvaluation from "interfaces/IEvaluation";
import IHomework from "interfaces/IHomework";
import IUser from "interfaces/IUser";

const mapStateToProps = (state: ApplicationState) => ({
  user: state.reducer.user
});

interface IRecommendedActionsPanelProps {
  user: IUser;
}

const RecommendedActionsPanel: React.FC<IRecommendedActionsPanelProps> = ({
  user
}) => {
  const [recommendedActions, setRecommendedActions] = useState<any>([]);

  useEffect(() => {
    const userAssignments = [...user.evaluations, ...user.homework];

    const sortedUserAssignments = userAssignments.sort(
      (a, b) =>
        determinePriorityNumber(b.urgency) +
        determinePriorityDateNumber(moment(b.date)) -
        (determinePriorityNumber(a.urgency) +
          determinePriorityDateNumber(moment(a.date)))
    );

    setRecommendedActions(sortedUserAssignments);
  }, [user.evaluations, user.homework, user.toDos]);

  return (
    <React.Fragment>
      <Header>
        <Title>Recommended Actions</Title>
      </Header>
      <Content>
        {recommendedActions.filter(
          (assignment: IEvaluation | IHomework) => !assignment.done
        ).length ? (
          recommendedActions.map(
            (assignment: IEvaluation | IHomework) =>
              !assignment.done && (
                <RecommendedActionCard
                  key={assignment._id}
                  assignment={assignment}
                />
              )
          )
        ) : (
          <StyledEmpty description="No Recomendations" />
        )}
      </Content>
    </React.Fragment>
  );
};

const Header = styled.div`
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.fontColors.textRgba(0.1)};
`;

const Title = styled.h3`
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;

  color: ${props => props.theme.fontColors.textRgba(0.8)};
`;

const Content = styled.div`
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const StyledEmpty = styled(Empty)`
  && {
    margin-top: auto;
    margin-bottom: auto;
  }
`;

export default connect(mapStateToProps)(RecommendedActionsPanel);
