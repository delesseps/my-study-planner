import React from "react";
import styled from "styled-components";
import { Icon, Badge, Avatar, Modal, Divider } from "antd";
import IEvaluation from "interfaces/IEvaluation";
import { setDate, determinePriority, determineColor } from "utils";
import moment from "moment";

const EvaluationDrawer = React.lazy(() =>
  import("components/drawers/EvaluationDrawer/EvaluationDrawer")
);

const Wrapper = styled.div`
  padding: 0.8rem 2rem;
  border: 0.7px solid ${props => props.theme.fontColors.blackRgba(0.15)};
  border-radius: 5px;

  display: flex;
  flex-direction: column;

  height: 16rem;
  width: 100%;

  justify-content: space-between;
`;

const MainInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Assignment = styled.div`
  display: flex;
  flex-direction: column;
`;

const AssignmentTitle = styled.h3`
  letter-spacing: 0.5px;
  font-weight: 500;
  font-size: 1.7rem;
  color: ${props => props.theme.fontColors.blackRgba(0.8)};
`;

const Capitalize = styled.span`
  text-transform: capitalize;
`;

const AssignmentPriority = styled.h5`
  display: flex;
  align-items: center;
  color: ${props => props.theme.fontColors.blackRgba(0.5)};
  margin: 0;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  & > *:not(:last-child) {
    margin-right: 1.5rem;
  }
`;

const StyledIcon = styled(Icon)`
  cursor: pointer;
  font-size: 1.9rem;
`;

const OtherInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const User = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled.h5`
  letter-spacing: 1px;
  display: flex;
  font-weight: bold;
  font-size: 1.2rem;
  align-items: center;
  color: ${props => props.theme.fontColors.blackRgba(0.6)};
  margin: 0;
  margin-left: 0.7rem;
`;

const Date = styled.h5`
  letter-spacing: 1px;
  display: flex;
  font-weight: 400;
  align-items: center;
  color: ${props => props.theme.fontColors.blackRgba(0.8)};
  margin: 0;
`;

const Clock = styled(Icon)`
  font-size: 2rem;
  margin-right: 0.7rem;
`;

const ViewMore = styled.span`
  cursor: pointer;
  color: ${props => props.theme.colors.main};
  margin-left: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const ModalTime = styled.h5`
  display: flex;
  font-weight: 400;
  align-items: center;
  color: rgba(27, 27, 27, 0.8);
  margin: 0;
`;

const ModalTitle = styled.h3`
  letter-spacing: 0.5px;
  margin: 0;
  font-weight: 500;
  font-size: 1.7rem;
  color: rgba(27, 27, 27, 0.8);
`;

const ModalTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalContent = styled.p`
  margin-top: 1.3rem;
  line-height: 3rem;
`;

const openDescriptionModal = (evaluation: IEvaluation) => {
  if (!evaluation.description) evaluation.description = ""; //Check if description is null and reassign it as an empty string

  Modal.info({
    title: (
      <ModalTitleWrapper>
        <ModalTitle>
          <Capitalize>{evaluation.evaluationType}</Capitalize>:{" "}
          {evaluation.subject}
        </ModalTitle>
        <ModalTime>
          <Clock type="clock-circle" />
          {setDate(moment(evaluation.date))}
        </ModalTime>
      </ModalTitleWrapper>
    ),
    content: (
      <ModalContent>
        Description: <br />
        {evaluation.description.length === 0 ? (
          <em>No Description</em>
        ) : (
          evaluation.description
        )}
      </ModalContent>
    ),
    onOk() {}
  });
};

interface IEvaluationCardProps {
  evaluation: IEvaluation;
}

const EvaluationCard: React.FunctionComponent<IEvaluationCardProps> = ({
  evaluation
}) => {
  const handleViewMoreClick = () => {
    openDescriptionModal(evaluation);
  };

  return (
    <Wrapper>
      <EvaluationDrawer evaluation={evaluation} />
      <MainInfo>
        <Assignment>
          <AssignmentTitle>
            <Capitalize>{evaluation.evaluationType}</Capitalize>:{" "}
            {evaluation.subject}
          </AssignmentTitle>
          <AssignmentPriority>
            <Badge color={determineColor(evaluation.urgency)} />
            {/* @TODO: Add urgency util function */}
            {determinePriority(evaluation.urgency)}
          </AssignmentPriority>
        </Assignment>
        <Actions>
          <StyledIcon type="check" />
          <StyledIcon type="edit" />
          <StyledIcon type="delete" />
        </Actions>
      </MainInfo>
      <OtherInfo>
        <User>
          <Avatar size={30} icon="user" src={evaluation.createdBy.picture} />
          <UserName>{evaluation.createdBy.name}</UserName>
        </User>
        <Date>
          <Clock type="clock-circle" />
          {setDate(moment(evaluation.date))} <Divider type="vertical" />
          <ViewMore onClick={handleViewMoreClick}> View More</ViewMore>
        </Date>
      </OtherInfo>
    </Wrapper>
  );
};

export default EvaluationCard;
