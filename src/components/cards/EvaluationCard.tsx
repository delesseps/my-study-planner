import React, { useState } from "react";
import styled from "styled-components";
import { Icon, Badge, Avatar, Divider, Popconfirm, Tooltip } from "antd";
import IEvaluation from "interfaces/IEvaluation";
import { setDate, determinePriority, determineColor } from "utils";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deleteEvaluation, editEvaluation } from "store/effects";
import EvaluationDescriptionModal from "components/modals/EvaluationDescription";

const EvaluationDrawer = React.lazy(() =>
  import("components/drawers/EvaluationDrawer")
);

interface IEvaluationCardProps {
  evaluation: IEvaluation;
  index: number;
}

const EvaluationCard: React.FunctionComponent<IEvaluationCardProps> = ({
  evaluation,
  index
}) => {
  const [visibleEdit, setVisibleEdit] = useState(false);
  const dispatch = useDispatch();

  const handleViewMoreClick = () => {
    EvaluationDescriptionModal(evaluation);
  };

  const handleEditClick = () => {
    setVisibleEdit(true);
  };

  const handleDeleteClick = () => {
    dispatch(deleteEvaluation(evaluation._id, index));
  };

  const handleDoneClick = () => {
    evaluation.done = true;
    dispatch(editEvaluation(evaluation, index));
  };

  return (
    <Wrapper>
      <EvaluationDrawer
        visibleEdit={visibleEdit}
        setVisibleEdit={setVisibleEdit}
        evaluation={evaluation}
        index={index}
      />
      <MainInfo>
        <Assignment>
          <AssignmentTitle>
            <Capitalize>{evaluation.evaluationType}</Capitalize>:{" "}
            {evaluation.subject}
          </AssignmentTitle>
          <AssignmentPriority>
            <Badge color={determineColor(evaluation.urgency)} />
            {determinePriority(evaluation.urgency)}
          </AssignmentPriority>
        </Assignment>
        <Actions>
          <Tooltip title="Done">
            <StyledIcon onClick={handleDoneClick} type="check" />
          </Tooltip>

          <Tooltip title="Edit">
            <StyledIcon onClick={handleEditClick} type="edit" />
          </Tooltip>

          <Popconfirm
            title="Are you sure to delete this evaluation?"
            arrowPointAtCenter={true}
            placement="topRight"
            okText="Yes"
            cancelText="No"
            onConfirm={handleDeleteClick}
          >
            <StyledIcon type="delete" />
          </Popconfirm>
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

const Wrapper = styled.div`
  padding: 0.8rem 2rem;
  border: 0.7px solid ${props => props.theme.fontColors.textRgba(0.15)};
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
  color: ${props => props.theme.fontColors.textRgba(0.8)};
`;

const Capitalize = styled.span`
  text-transform: capitalize;
`;

const AssignmentPriority = styled.h5`
  display: flex;
  align-items: center;
  color: ${props => props.theme.fontColors.textRgba(0.5)};
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
  transition: 0.1s;

  &:hover {
    color: ${props => props.theme.colors.main};
  }
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
  color: ${props => props.theme.fontColors.textRgba(0.6)};
  margin: 0;
  margin-left: 0.7rem;
`;

const Date = styled.h5`
  letter-spacing: 1px;
  display: flex;
  font-weight: 400;
  align-items: center;
  color: ${props => props.theme.fontColors.textRgba(0.8)};
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

export default EvaluationCard;
