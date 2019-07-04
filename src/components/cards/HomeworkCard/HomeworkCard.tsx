import React, { useState } from "react";
import styled from "styled-components";
import { Icon, Badge, Avatar, Divider, Popconfirm, Tooltip } from "antd";
import { setDate, determinePriority, determineColor } from "utils";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deleteHomework, editHomework } from "store/effects";
import IHomework from "interfaces/IHomework";
import HomeworkDescriptionModal from "components/modals/HomeworkDescriptionModal/HomeworkDescriptionModal";

const HomeworkDrawer = React.lazy(() =>
  import("components/drawers/HomeworkDrawer/HomeworkDrawer")
);

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

interface IHomeworkCardProps {
  homework: IHomework;
  index: number;
}

const HomeworkCard: React.FunctionComponent<IHomeworkCardProps> = ({
  homework,
  index
}) => {
  const [visibleEdit, setVisibleEdit] = useState(false);
  const dispatch = useDispatch();

  const handleViewMoreClick = () => {
    HomeworkDescriptionModal(homework);
  };

  const handleEditClick = () => {
    setVisibleEdit(true);
  };

  const handleDeleteClick = () => {
    dispatch(deleteHomework(homework._id, index));
  };

  const handleDoneClick = () => {
    homework.done = true;
    dispatch(editHomework(homework, index));
  };

  return (
    <Wrapper>
      <HomeworkDrawer
        visibleEdit={visibleEdit}
        setVisibleEdit={setVisibleEdit}
        homework={homework}
        index={index}
      />
      <MainInfo>
        <Assignment>
          <AssignmentTitle>{homework.subject}</AssignmentTitle>
          <AssignmentPriority>
            <Badge color={determineColor(homework.urgency)} />
            {determinePriority(homework.urgency)}
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
            title="Are you sure delete this homework?"
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
          <Avatar size={30} icon="user" src={homework.createdBy.picture} />
          <UserName>{homework.createdBy.name}</UserName>
        </User>
        <Date>
          <Clock type="clock-circle" />
          {setDate(moment(homework.date))} <Divider type="vertical" />
          <ViewMore onClick={handleViewMoreClick}> View More</ViewMore>
        </Date>
      </OtherInfo>
    </Wrapper>
  );
};

export default HomeworkCard;
