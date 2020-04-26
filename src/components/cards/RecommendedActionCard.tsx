import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Badge, Divider } from "antd";

import IEvaluation from "constants/interfaces/IEvaluation";
import IHomework from "constants/interfaces/IHomework";
import { determineColor } from "utils";
import HomeworkDescriptionModal from "components/modals/HomeworkDescription";
import EvaluationDescriptionModal from "components/modals/EvaluationDescription";
import { useHomework } from "features/homework/homework-hooks";
import { useEvaluations } from "features/evaluation/evaluation-hooks";

interface IRecommendedActionCardProps {
  assignment: IHomework | IEvaluation | any;
}

const RecommendedActionCard: React.FC<IRecommendedActionCardProps> = ({
  assignment,
}) => {
  const [recommendedAction, setRecommendedAction] = useState("");
  const {
    edit: [editHomeworkMutate],
  } = useHomework();
  const {
    edit: [editEvaluationMutate],
  } = useEvaluations();

  useEffect(() => {
    assignment.evaluationType
      ? setRecommendedAction("Start studying for ")
      : setRecommendedAction("Start Working on ");
  }, [assignment]);

  const handleViewMoreClick = () => {
    assignment.evaluationType
      ? EvaluationDescriptionModal(assignment)
      : HomeworkDescriptionModal(assignment);
  };

  const handleMarkAsDone = () => {
    assignment.done = true;

    if (assignment.evaluationType) {
      return editEvaluationMutate({ evaluation: assignment });
    }

    editHomeworkMutate({ homework: assignment });
  };

  return (
    <Wrapper>
      <RowWrapper>
        <Badge color={determineColor(assignment.urgency)} />
        <RecommendationTitle>
          {recommendedAction + assignment.subject}
        </RecommendationTitle>
      </RowWrapper>

      <ActionContainer>
        <ViewMore onClick={handleViewMoreClick}>View More</ViewMore>
        <Divider type="vertical" />
        <Done onClick={handleMarkAsDone}>Done</Done>
      </ActionContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  padding: 2rem 2rem;

  border-top: 0.5px solid ${(props) => props.theme.fontColors.textRgba(0.2)};
  border-bottom: 0.5px solid ${(props) => props.theme.fontColors.textRgba(0.2)};

  width: 100%;
`;

const RowWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const RecommendationTitle = styled.h3`
  margin-bottom: 0;
  font-weight: 400;

  letter-spacing: 1px;
  font-size: 1.7rem;
  color: ${(props) => props.theme.fontColors.textRgba(0.8)};
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ViewMore = styled.span`
  cursor: pointer;
  color: ${(props) => props.theme.colors.main};
  margin-left: 1.3rem;

  &:hover {
    text-decoration: underline;
  }
`;

const Done = styled.span`
  cursor: pointer;
  color: ${(props) => props.theme.colors.main};

  &:hover {
    text-decoration: underline;
  }
`;

export default RecommendedActionCard;
