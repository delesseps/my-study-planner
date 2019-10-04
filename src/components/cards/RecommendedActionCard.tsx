import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Badge } from "antd";
import IEvaluation from "interfaces/IEvaluation";
import IHomework from "interfaces/IHomework";
import { determineColor } from "utils";
import HomeworkDescriptionModal from "components/modals/HomeworkDescription";
import EvaluationDescriptionModal from "components/modals/EvaluationDescription";

interface IRecommendedActionCardProps {
  assignment: IHomework | IEvaluation | any;
}

const RecommendedActionCard: React.FC<IRecommendedActionCardProps> = ({
  assignment
}) => {
  const [recommendedAction, setRecommendedAction] = useState("");

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

  return (
    <Wrapper>
      <RowWrapper>
        <Badge color={determineColor(assignment.urgency)} />
        <RecomendationTitle>
          {recommendedAction + assignment.subject}
        </RecomendationTitle>
      </RowWrapper>

      <ViewMore onClick={handleViewMoreClick}>View More</ViewMore>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  padding: 2rem 2rem;

  border-top: 0.5px solid ${props => props.theme.fontColors.textRgba(0.2)};
  border-bottom: 0.5px solid ${props => props.theme.fontColors.textRgba(0.2)};

  width: 100%;
`;

const RowWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const RecomendationTitle = styled.h3`
  margin-bottom: 0;
  font-weight: 400;

  letter-spacing: 1px;
  font-size: 1.7rem;
  color: ${props => props.theme.fontColors.textRgba(0.8)};
`;

const ViewMore = styled.span`
  cursor: pointer;
  color: ${props => props.theme.colors.main};
  margin-left: 1.3rem;

  &:hover {
    text-decoration: underline;
  }
`;

export default RecommendedActionCard;
